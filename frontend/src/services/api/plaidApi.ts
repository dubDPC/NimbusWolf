import apiClient from './axios.config';
import type { ApiResponse } from '../../types/api.types';

export interface ConnectedAccount {
  id: string;
  userId: string;
  plaidItemId: string;
  institutionId: string;
  institutionName: string;
  accountType: string;
  accountName: string;
  status: string;
  lastSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLinkTokenResponse {
  linkToken: string;
}

export interface ExchangePublicTokenResponse {
  account: ConnectedAccount;
  plaidAccounts: any[];
}

export interface GetAccountsResponse {
  accounts: ConnectedAccount[];
}

export interface SyncTransactionsResponse {
  transactionsSynced: number;
  account: ConnectedAccount;
}

const plaidApi = {
  async createLinkToken(): Promise<ApiResponse<CreateLinkTokenResponse>> {
    const response = await apiClient.post<ApiResponse<CreateLinkTokenResponse>>(
      '/plaid/create-link-token'
    );
    return response.data;
  },

  async exchangePublicToken(
    publicToken: string
  ): Promise<ApiResponse<ExchangePublicTokenResponse>> {
    const response = await apiClient.post<
      ApiResponse<ExchangePublicTokenResponse>
    >('/plaid/exchange-public-token', {
      publicToken,
    });
    return response.data;
  },

  async getAccounts(): Promise<ApiResponse<GetAccountsResponse>> {
    const response = await apiClient.get<ApiResponse<GetAccountsResponse>>(
      '/plaid/accounts'
    );
    return response.data;
  },

  async syncTransactions(
    accountId: string
  ): Promise<ApiResponse<SyncTransactionsResponse>> {
    const response = await apiClient.post<
      ApiResponse<SyncTransactionsResponse>
    >(`/plaid/accounts/${accountId}/sync`);
    return response.data;
  },

  async deleteAccount(accountId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/plaid/accounts/${accountId}`
    );
    return response.data;
  },
};

export default plaidApi;
