import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, accessToken } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated && !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
