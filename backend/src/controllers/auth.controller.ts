import { Request, Response } from 'express';
import authService from '../services/auth.service';

export class AuthController {
  /**
   * Register a new user
   * POST /api/v1/auth/register
   */
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      // Validate email format
      if (!authService.validateEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Validate password strength
      const passwordValidation = authService.validatePassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({
          success: false,
          message: 'Password does not meet requirements',
          errors: passwordValidation.errors,
        });
      }

      // Register the user
      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        phone,
      });

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      console.error('Register error:', error);

      if (error instanceof Error && error.message.includes('already exists')) {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'An error occurred during registration',
      });
    }
  }

  /**
   * Login a user
   * POST /api/v1/auth/login
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      // Login the user
      const result = await authService.login({ email, password });

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      console.error('Login error:', error);

      if (error instanceof Error && error.message.includes('Invalid')) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      return res.status(500).json({
        success: false,
        message: 'An error occurred during login',
      });
    }
  }

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh-token
   */
  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token not found',
        });
      }

      // Refresh the access token
      const result = await authService.refreshAccessToken(refreshToken);

      return res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      console.error('Refresh token error:', error);

      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }
  }

  /**
   * Logout a user
   * POST /api/v1/auth/logout
   */
  async logout(req: Request, res: Response) {
    try {
      // Clear the refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      console.error('Logout error:', error);

      return res.status(500).json({
        success: false,
        message: 'An error occurred during logout',
      });
    }
  }

  /**
   * Get current user profile
   * GET /api/v1/auth/me
   */
  async getMe(req: Request, res: Response) {
    try {
      // User is attached to request by auth middleware
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated',
        });
      }

      const user = await authService.getUserById(userId);

      return res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      console.error('Get me error:', error);

      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching user profile',
      });
    }
  }
}

export default new AuthController();
