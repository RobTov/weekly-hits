import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  MusicNote,
} from '@mui/icons-material';
import { useArtistStore } from '../../store/artist-store';

const ArtistManagement: React.FC = () => {
  const { artists, loading, error, getArtist, createArtist, updateArtist, deleteArtist } = useArtistStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);
  const [editingArtist, setEditingArtist] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    genre: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    getArtist();
  }, [getArtist]);

  const handleOpenDialog = (artistId?: number) => {
    if (artistId) {
      const artist = artists.find((a) => a.id === artistId);
      if (artist) {
        setEditingArtist(artistId);
        setFormData({
          name: artist.name,
          country: artist.country,
          genre: artist.genre,
        });
      }
    } else {
      setEditingArtist(null);
      setFormData({
        name: '',
        country: '',
        genre: '',
      });
    }
    setFormError('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingArtist(null);
    setFormError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError('');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.country || !formData.genre) {
      setFormError('Todos los campos son requeridos');
      return;
    }

    try {
      if (editingArtist) {
        await updateArtist({
          id: editingArtist,
          ...formData,
        });
      } else {
        await createArtist({
          id: 0,
          ...formData,
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving artist:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteDialog !== null) {
      try {
        await deleteArtist(deleteDialog);
        setDeleteDialog(null);
      } catch (error) {
        console.error('Error deleting artist:', error);
      }
    }
  };

  const countries = [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
    'Cuba', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos',
    'Francia', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá',
    'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay',
    'Venezuela', 'Otro'
  ];

  const genres = [
    'Pop', 'Rock', 'Reggaeton', 'Salsa', 'Bachata', 'Merengue',
    'Cumbia', 'Vallenato', 'Trap', 'Hip Hop', 'R&B', 'Jazz',
    'Electrónica', 'Pop Latino', 'Latin Pop', 'Dembow', 'Metal', 'Indie'
  ];

  if (loading && artists.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Artistas
        </Typography>
        <Skeleton variant="rectangular" height={400} />
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
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MusicNote sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                  Gestión de Artistas
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Administra los artistas del sistema
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{
                backgroundColor: 'white',
                color: '#f5576c',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Nuevo Artista
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>País</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Género</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artists.map((artist) => (
                  <TableRow key={artist.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ color: '#667eea' }} />
                        {artist.name}
                      </Box>
                    </TableCell>
                    <TableCell>{artist.country}</TableCell>
                    <TableCell>
                      <Chip
                        label={artist.genre}
                        size="small"
                        sx={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          fontWeight: 'bold',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(artist.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeleteDialog(artist.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingArtist ? 'Editar Artista' : 'Nuevo Artista'}
          </DialogTitle>
          <DialogContent>
            {formError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formError}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Nombre del Artista"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              fullWidth
              select
              label="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Género Musical"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Guardando...' : editingArtist ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteDialog !== null} onClose={() => setDeleteDialog(null)}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar este artista? Esta acción eliminará también todas las canciones asociadas.
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

export default ArtistManagement;
