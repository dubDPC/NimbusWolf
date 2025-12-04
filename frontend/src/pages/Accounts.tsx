import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PlaidLinkButton from '../components/plaid/PlaidLinkButton';
import plaidApi from '../services/api/plaidApi';

interface ConnectedAccount {
  id: string;
  userId: string;
  plaidItemId: string;
  institutionId: string;
  institutionName: string;
  accountType: string;
  accountSubtype: string | null;
  accountName: string | null;
  isActive: boolean;
  lastSyncAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await plaidApi.getAccounts();
      setAccounts(response.data?.accounts || []);
    } catch (err: any) {
      console.error('Error loading accounts:', err);
      setError(err.response?.data?.message || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleSync = async (accountId: string) => {
    try {
      setSyncing(accountId);
      setError(null);
      await plaidApi.syncTransactions(accountId);
      await loadAccounts();
    } catch (err: any) {
      console.error('Error syncing account:', err);
      setError(err.response?.data?.message || 'Failed to sync transactions');
    } finally {
      setSyncing(null);
    }
  };

  const handleDelete = async (accountId: string) => {
    if (!window.confirm('Are you sure you want to disconnect this account?')) {
      return;
    }

    try {
      setError(null);
      await plaidApi.deleteAccount(accountId);
      await loadAccounts();
    } catch (err: any) {
      console.error('Error deleting account:', err);
      setError(err.response?.data?.message || 'Failed to disconnect account');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Connected Accounts
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your connected bank accounts and sync transactions
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <PlaidLinkButton onSuccess={loadAccounts} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : accounts.length === 0 ? (
        <Card>
          <CardContent>
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No accounts connected
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connect your first bank account to start tracking your finances
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {accounts.map((account) => (
            <Grid item xs={12} md={6} key={account.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccountBalanceIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{account.accountName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {account.institutionName}
                      </Typography>
                    </Box>
                    <Chip
                      label={account.isActive ? 'Active' : 'Inactive'}
                      color={account.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Account Type
                    </Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {account.accountType}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Last Synced
                    </Typography>
                    <Typography variant="body2">
                      {account.lastSyncAt
                        ? formatDate(account.lastSyncAt)
                        : 'Never'}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={
                      syncing === account.id ? (
                        <CircularProgress size={16} />
                      ) : (
                        <SyncIcon />
                      )
                    }
                    onClick={() => handleSync(account.id)}
                    disabled={syncing === account.id}
                  >
                    {syncing === account.id ? 'Syncing...' : 'Sync Transactions'}
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(account.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
