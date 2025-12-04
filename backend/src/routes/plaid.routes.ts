import { Router } from 'express';
import { plaidController } from '../controllers/plaid.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-link-token', authenticate, (req, res) =>
  plaidController.createLinkToken(req, res)
);

router.post('/exchange-public-token', authenticate, (req, res) =>
  plaidController.exchangePublicToken(req, res)
);

router.get('/accounts', authenticate, (req, res) =>
  plaidController.getAccounts(req, res)
);

router.post('/accounts/:accountId/sync', authenticate, (req, res) =>
  plaidController.syncTransactions(req, res)
);

router.delete('/accounts/:accountId', authenticate, (req, res) =>
  plaidController.deleteAccount(req, res)
);

router.get('/transactions', authenticate, (req, res) =>
  plaidController.getTransactions(req, res)
);

export default router;
