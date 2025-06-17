import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  const location = useLocation();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f5f5"
      px={2}
      textAlign="center"
    >
      <Typography variant="h2" fontWeight="bold" color="text.primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No match found for{' '}
        <Box component="span" color="error.main" fontWeight="bold">
          {location.pathname}
        </Box>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/login"
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
