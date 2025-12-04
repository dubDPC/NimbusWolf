import { useState, useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import plaidApi from '../../services/api/plaidApi';

interface PlaidLinkButtonProps {
  onSuccess?: () => void;
}

export default function PlaidLinkButton({ onSuccess }: PlaidLinkButtonProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPlaidSuccess = useCallback(
    async (publicToken: string) => {
      try {
        setLoading(true);
        setError(null);

        await plaidApi.exchangePublicToken(publicToken);

        if (onSuccess) {
          onSuccess();
        }
      } catch (err: any) {
        console.error('Error exchanging public token:', err);
        setError(err.response?.data?.message || 'Failed to connect account');
      } finally {
        setLoading(false);
        setLinkToken(null);
      }
    },
    [onSuccess]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
    onExit: (err) => {
      if (err) {
        console.error('Plaid Link exited with error:', err);
        setError('Failed to connect account');
      }
      setLoading(false);
      setLinkToken(null);
    },
  });

  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await plaidApi.createLinkToken();
      setLinkToken(response.data?.linkToken || null);
    } catch (err: any) {
      console.error('Error creating link token:', err);
      setError(err.response?.data?.message || 'Failed to initialize Plaid');
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
        onClick={handleClick}
        disabled={loading || (linkToken !== null && !ready)}
      >
        {loading ? 'Connecting...' : 'Connect Bank Account'}
      </Button>
    </>
  );
}
