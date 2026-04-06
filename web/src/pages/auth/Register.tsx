import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  MusicNote,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuthStore } from '../../store/auth-store';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    role: 'musical_programmer' as 'administrator' | 'musical_programmer',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirm) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setValidationError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      await register(formData);
      navigate('/');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Button
          component={RouterLink}
          to="/login"
          startIcon={<ArrowBack />}
          sx={{ mb: 2, color: 'white' }}
        >
          Volver al inicio de sesión
        </Button>

        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <MusicNote sx={{ fontSize: 60, color: '#667eea', mb: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" color="#333">
              Weekly Hits
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Crear Cuenta
            </Typography>
          </Box>

          {(error || validationError) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error || validationError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="first_name"
                  variant="outlined"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="last_name"
                  variant="outlined"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Usuario"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              select
              label="Rol"
              name="role"
              variant="outlined"
              value={formData.role}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            >
              <MenuItem value="musical_programmer">Programador Musical</MenuItem>
              <MenuItem value="administrator">Administrador</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Mínimo 8 caracteres"
            />

            <TextField
              fullWidth
              label="Confirmar Contraseña"
              name="password_confirm"
              type="password"
              variant="outlined"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                },
              }}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes una cuenta?{' '}
              <Link component={RouterLink} to="/login" sx={{ fontWeight: 'bold' }}>
                Inicia sesión
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
