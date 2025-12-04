import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Card,
} from '@mui/material';
import plaidApi from '../services/api/plaidApi';

interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  plaidTransactionId: string;
  amount: number;
  date: Date;
  merchantName: string | null;
  categoryPrimary: string | null;
  categoryDetailed: string | null;
  isPending: boolean;
  createdAt: Date;
  updatedAt: Date;
  account: {
    accountName: string | null;
    institutionName: string;
  };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await plaidApi.getTransactions();
      setTransactions(response.data?.transactions || []);
    } catch (err: any) {
      console.error('Error loading transactions:', err);
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Transactions
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View all your synced transactions from connected accounts
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : transactions.length === 0 ? (
        <Card>
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              No transactions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connect an account and sync transactions to see them here
            </Typography>
          </Box>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Merchant</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    {transaction.merchantName || 'Unknown Merchant'}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {transaction.account.accountName || 'Account'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.account.institutionName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {transaction.categoryPrimary || 'Uncategorized'}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        color: transaction.amount > 0 ? 'error.main' : 'success.main',
                        fontWeight: 500,
                      }}
                    >
                      {formatAmount(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={transaction.isPending ? 'Pending' : 'Posted'}
                      color={transaction.isPending ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
