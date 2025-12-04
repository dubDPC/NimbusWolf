import { Request, Response } from 'express';
import { plaidService } from '../services/plaid.service';

export class PlaidController {
  async createLinkToken(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      const linkToken = await plaidService.createLinkToken(userId);

      res.json({
        success: true,
        data: { linkToken },
        message: 'Link token created successfully',
      });
    } catch (error: any) {
      console.error('Error creating link token:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create link token',
      });
    }
  }

  async exchangePublicToken(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { publicToken } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      if (!publicToken) {
        return res.status(400).json({
          success: false,
          message: 'Public token is required',
        });
      }

      const result = await plaidService.exchangePublicToken(
        userId,
        publicToken
      );

      res.json({
        success: true,
        data: result,
        message: 'Account connected successfully',
      });
    } catch (error: any) {
      console.error('Error exchanging public token:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to connect account',
      });
    }
  }

  async getAccounts(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      const accounts = await plaidService.getAccounts(userId);

      res.json({
        success: true,
        data: { accounts },
        message: 'Accounts retrieved successfully',
      });
    } catch (error: any) {
      console.error('Error getting accounts:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get accounts',
      });
    }
  }

  async syncTransactions(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { accountId } = req.params;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      if (!accountId) {
        return res.status(400).json({
          success: false,
          message: 'Account ID is required',
        });
      }

      const result = await plaidService.syncTransactions(accountId);

      res.json({
        success: true,
        data: result,
        message: 'Transactions synced successfully',
      });
    } catch (error: any) {
      console.error('Error syncing transactions:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to sync transactions',
      });
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { accountId } = req.params;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }

      if (!accountId) {
        return res.status(400).json({
          success: false,
          message: 'Account ID is required',
        });
      }

      const result = await plaidService.deleteAccount(userId, accountId);

      res.json({
        success: true,
        data: result,
        message: 'Account disconnected successfully',
      });
    } catch (error: any) {
      console.error('Error deleting account:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to disconnect account',
      });
    }
  }
}

export const plaidController = new PlaidController();
