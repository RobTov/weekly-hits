import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  MusicNote,
  BarChart,
  LibraryMusic,
  TrendingUp,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                Weekly Hits
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
                Tu plataforma para descubrir y gestionar las mejores canciones de la semana
              </Typography>
              {!isAuthenticated && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      backgroundColor: 'white',
                      color: '#667eea',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Registrarse
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <MusicNote sx={{ fontSize: 200, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate('/songs')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <LibraryMusic sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Catálogo de Canciones
                </Typography>
                <Typography color="text.secondary">
                  Explora todas las canciones disponibles con filtros por género
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button variant="outlined" color="primary">
                  Ver Catálogo
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate('/top-songs')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <TrendingUp sx={{ fontSize: 80, color: '#f5576c', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Top 10 Canciones
                </Typography>
                <Typography color="text.secondary">
                  Descubre las canciones más valoradas de la plataforma
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button variant="outlined" color="error">
                  Ver Rankings
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate('/songs')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <BarChart sx={{ fontSize: 80, color: '#48bb78', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Estadísticas
                </Typography>
                <Typography color="text.secondary">
                  Visualiza gráficos y estadísticas de las canciones
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button variant="outlined" color="success">
                  Ver Estadísticas
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {isAuthenticated && (user?.is_musical_programmer || user?.is_administrator) && (
          <Paper elevation={3} sx={{ mt: 6, p: 4, borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Gestión de Contenido
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Bienvenido, {user?.first_name || user?.username}
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                  onClick={() => navigate('/my-songs')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LibraryMusic sx={{ fontSize: 50, color: '#667eea' }} />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Mis Canciones
                      </Typography>
                      <Typography color="text.secondary">
                        Gestiona las canciones que has subido
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {user?.is_administrator && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                    onClick={() => navigate('/users')}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Person sx={{ fontSize: 50, color: '#f5576c' }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Gestión de Usuarios
                        </Typography>
                        <Typography color="text.secondary">
                          Administra cuentas de usuarios del sistema
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        )}

        <Paper elevation={2} sx={{ mt: 6, p: 4, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Acerca de Weekly Hits
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Weekly Hits es una plataforma web desarrollada para gestionar y mostrar las canciones más populares de cada semana.
          </Typography>
          <Typography color="text.secondary">
            Con un sistema de roles que incluye Administradores y Programadores Musicales, puedes gestionar contenido musical
            de manera eficiente y mantener tu catálogo actualizado.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
