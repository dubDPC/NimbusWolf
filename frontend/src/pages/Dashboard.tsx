import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { logout, getMe } from '../store/slices/authSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Fetch user profile on mount if not already loaded
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem',
                }}
              >
                {user?.firstName?.[0] || user?.email[0].toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Connected Accounts
              </Typography>
              <Typography variant="h3">0</Typography>
              <Typography variant="body2" color="text.secondary">
                No accounts connected yet
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Total Balance
              </Typography>
              <Typography variant="h3">$0.00</Typography>
              <Typography variant="body2" color="text.secondary">
                Across all accounts
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Recent Transactions
              </Typography>
              <Typography variant="h3">0</Typography>
              <Typography variant="body2" color="text.secondary">
                In the last 30 days
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" onClick={() => navigate('/accounts')}>
                  Connect Account
                </Button>
                <Button variant="outlined">View Transactions</Button>
                <Button variant="outlined">Create Budget</Button>
                <Button variant="outlined">Start Audit</Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Name:</strong>{' '}
                  {user?.firstName || user?.lastName
                    ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
                    : 'Not provided'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Phone:</strong> {user?.phone || 'Not provided'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Account Status:</strong>{' '}
                  {user?.isVerified ? 'Verified' : 'Not verified'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Member since:</strong>{' '}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'Unknown'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
