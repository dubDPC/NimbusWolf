import { Router } from 'express';
import authRoutes from './auth.routes';
import plaidRoutes from './plaid.routes';

const router = Router();

// Mount auth routes
router.use('/auth', authRoutes);

// Mount plaid routes
router.use('/plaid', plaidRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NimbusWolf API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
