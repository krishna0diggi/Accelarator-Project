import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper
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
      // console.log("User available now!", user);
      // console.log(user.role);

      redirectBasedOnRole();
    }
  }, [user]);

  const redirectBasedOnRole = () => {
    // console.log("Role is coming", user?.role);
    switch (user?.role) {
      case ROLES.SUPER_ADMIN:
        return navigate('/superAdmin/dashboard');
      case ROLES.ADMIN:
        return navigate('/apps');
      case ROLES.USER:
      default:
        return navigate('/employee/my-assets');
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
    // 🔐 Add your API call here
    try {
      await login({ email: formData.email, password: formData.password });
      // toast.success('Login Successfully');
    } catch (error) {
      console.error('Login failed:', error);
    }
    console.log('Logging in with:', formData.email, formData.password);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
