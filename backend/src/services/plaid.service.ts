import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
  LinkTokenCreateRequest,
  ItemPublicTokenExchangeRequest,
  AccountsGetRequest,
  TransactionsGetRequest,
} from 'plaid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PlaidService {
  private client: PlaidApi;

  constructor() {
    const configuration = new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
        },
      },
    });

    this.client = new PlaidApi(configuration);
  }

  async createLinkToken(userId: string): Promise<string> {
    const request: LinkTokenCreateRequest = {
      user: {
        client_user_id: userId,
      },
      client_name: 'NimbusWolf',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    };

    // Only include redirect_uri if it's set (needed for OAuth flows)
    if (process.env.PLAID_REDIRECT_URI) {
      request.redirect_uri = process.env.PLAID_REDIRECT_URI;
    }

    const response = await this.client.linkTokenCreate(request);
    return response.data.link_token;
  }

  async exchangePublicToken(userId: string, publicToken: string) {
    const exchangeRequest: ItemPublicTokenExchangeRequest = {
      public_token: publicToken,
    };

    const exchangeResponse = await this.client.itemPublicTokenExchange(
      exchangeRequest
    );

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    const accountsRequest: AccountsGetRequest = {
      access_token: accessToken,
    };

    const accountsResponse = await this.client.accountsGet(accountsRequest);
    const accounts = accountsResponse.data.accounts;

    const connectedAccount = await prisma.connectedAccount.create({
      data: {
        userId,
        plaidItemId: itemId,
        plaidAccessToken: accessToken,
        institutionId: accounts[0]?.institution_id || '',
        institutionName: 'Unknown',
        accountType: accounts[0]?.type || 'depository',
        accountSubtype: accounts[0]?.subtype,
        accountName: accounts[0]?.name || 'Account',
        isActive: true,
        lastSyncAt: new Date(),
      },
    });

    return {
      account: connectedAccount,
      plaidAccounts: accounts,
    };
  }

  async getAccounts(userId: string) {
    const connectedAccounts = await prisma.connectedAccount.findMany({
      where: {
        userId,
        isActive: true,
      },
    });

    return connectedAccounts;
  }

  async syncTransactions(accountId: string) {
    const account = await prisma.connectedAccount.findUnique({
      where: { id: accountId },
    });

    if (!account || !account.plaidAccessToken) {
      throw new Error('Account not found or access token missing');
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const request: TransactionsGetRequest = {
      access_token: account.plaidAccessToken,
      start_date: thirtyDaysAgo.toISOString().split('T')[0],
      end_date: now.toISOString().split('T')[0],
    };

    const response = await this.client.transactionsGet(request);
    const transactions = response.data.transactions;

    for (const txn of transactions) {
      await prisma.transaction.upsert({
        where: {
          plaidTransactionId: txn.transaction_id,
        },
        update: {
          amount: txn.amount,
          date: new Date(txn.date),
          merchantName: txn.merchant_name,
          categoryPrimary: txn.category?.[0],
          categoryDetailed: txn.category?.join(', '),
          isPending: txn.pending,
        },
        create: {
          userId: account.userId,
          accountId: account.id,
          plaidTransactionId: txn.transaction_id,
          amount: txn.amount,
          date: new Date(txn.date),
          merchantName: txn.merchant_name,
          categoryPrimary: txn.category?.[0],
          categoryDetailed: txn.category?.join(', '),
          isPending: txn.pending,
        },
      });
    }

    await prisma.connectedAccount.update({
      where: { id: accountId },
      data: { lastSyncAt: new Date() },
    });

    return {
      transactionsSynced: transactions.length,
      account,
    };
  }

  async deleteAccount(userId: string, accountId: string) {
    const account = await prisma.connectedAccount.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    await prisma.connectedAccount.update({
      where: { id: accountId },
      data: { isActive: false },
    });

    return { message: 'Account disconnected successfully' };
  }
}

export const plaidService = new PlaidService();
