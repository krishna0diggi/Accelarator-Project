import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Avatar
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../lib/roles';
import { useNavigate } from 'react-router-dom';

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, user, isLoading, error } = useAuth();

  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
    showPassword: false,
  });

  useEffect(() => {
    if (user) {
      redirectBasedOnRole();
    }
  }, [user]);

  const redirectBasedOnRole = () => {
    switch (user?.role) {
      case ROLES.SUPER_ADMIN:
        return navigate('/superAdmin/dashboard');
      case ROLES.ADMIN:
        return navigate('/datacruize');
      case ROLES.USER:
      default:
        return navigate('/apps');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePassword = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error('Login failed:', error);
    }
    console.log('Logging in with:', formData.email, formData.password);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 3, bgcolor: '#f5f5f5' }}>
        
        {/* Logo and App Title */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          {/* 👉 Add your logo image below */}
          <Avatar
            src="/path-to-your-logo.png" // Replace with your logo path
            alt="Data Cruize Logo"
            sx={{ width: 72, height: 72, mb: 1 }}
          />
          <Typography variant="h5" fontWeight={600} gutterBottom color="#e64a19">
            Data Cruize
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            Your Accelerator to Seamless Databricks Setup & Administration
          </Typography>
        </Box>

        {/* Login Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={formData.showPassword ? 'text' : 'password'}
            name="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {formData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              bgcolor: '#e64a19',
              '&:hover': { bgcolor: '#d84315' },
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>

        {/* Optional: Show error */}
        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default LoginPage;
