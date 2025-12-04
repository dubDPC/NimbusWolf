import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { sanitizeBody } from '../middleware/validation.middleware';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', sanitizeBody, (req, res) => {
  authController.register(req, res);
});

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post('/login', sanitizeBody, (req, res) => {
  authController.login(req, res);
});

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public (requires refresh token in cookie)
 */
router.post('/refresh-token', (req, res) => {
  authController.refreshToken(req, res);
});

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout a user
 * @access  Public
 */
router.post('/logout', (req, res) => {
  authController.logout(req, res);
});

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, (req, res) => {
  authController.getMe(req, res);
});

export default router;
