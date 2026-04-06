import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MusicNote,
  Album,
  CalendarToday,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSongStore } from '../../store/song-store';
import { useAuthStore } from '../../store/auth-store';

const MySongs: React.FC = () => {
  const navigate = useNavigate();
  const { mySongs, loading, getMySongs, deleteSong } = useSongStore();
  const { user } = useAuthStore();
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);

  useEffect(() => {
    getMySongs();
  }, [getMySongs]);

  const handleDelete = async () => {
    if (deleteDialog !== null) {
      try {
        await deleteSong(deleteDialog);
        setDeleteDialog(null);
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  if (!user || !(user.is_musical_programmer || user.is_administrator)) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            No tienes permiso para acceder a esta página
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (loading && mySongs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Canciones
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Mis Canciones
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Gestiona las canciones que has subido a la plataforma
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={() => navigate('/songs/create')}
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Nueva Canción
            </Button>
          </Box>
        </Paper>

        {mySongs.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <MusicNote sx={{ fontSize: 100, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No has subido ninguna canción
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Comienza subiendo tu primera canción a la plataforma
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/songs/create')}
            >
              Subir Canción
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {mySongs.map((song) => (
              <Grid key={song.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 140,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MusicNote sx={{ fontSize: 60, color: 'white' }} />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" fontWeight="bold" noWrap>
                      {song.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {song.artist_name}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={song.genre}
                        size="small"
                        sx={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Album fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {song.album}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(song.release_date).toLocaleDateString('es-ES')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star fontSize="small" sx={{ color: '#ffc107' }} />
                        <Typography variant="body2" fontWeight="bold">
                          Puntuación: {song.score}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/songs/edit/${song.id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setDeleteDialog(song.id)}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={deleteDialog !== null} onClose={() => setDeleteDialog(null)}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar esta canción? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(null)}>Cancelar</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default MySongs;
