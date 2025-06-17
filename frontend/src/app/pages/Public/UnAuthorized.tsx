import { Lock } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Stack, Avatar } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const UnauthorizedPage = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    bgcolor="#f5f5f5"
    px={2}
  >
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: "#fdecea", width: 56, height: 56, mx: "auto", mb: 2 }}>
        <Lock color="#f44336" />
      </Avatar>

      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        Unauthorized Access
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        You do not have permission to access this page.
        <br />
        Please contact your administrator if you believe this is a mistake.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          Go Home
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={RouterLink}
          to="/login"
        >
          Login
        </Button>
      </Stack>
    </Paper>
  </Box>
);

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/"); // or "/dashboard"
    }
  }, [user, navigate]);

  return <UnauthorizedPage />;
};

export default Unauthorized;
