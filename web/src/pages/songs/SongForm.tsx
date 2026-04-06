import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  MusicNote,
  CalendarToday,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useSongStore } from '../../store/song-store';
import { useArtistStore } from '../../store/artist-store';

const SongForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { createSong, updateSong, loading, error, getSongById } = useSongStore();
  const { artists, getArtist } = useArtistStore();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    album: '',
    genre: '',
    release_date: '',
    artist: '',
  });
  const [formError, setFormError] = useState('');
  const [initialLoading, setInitialLoading] = useState(isEditing);

  useEffect(() => {
    getArtist();
  }, [getArtist]);

  useEffect(() => {
    if (isEditing && id) {
      const loadSong = async () => {
        setInitialLoading(true);
        const song = await getSongById(parseInt(id));
        if (song) {
          setFormData({
            title: song.title,
            album: song.album,
            genre: song.genre,
            release_date: song.release_date.split('T')[0],
            artist: song.artist.toString(),
          });
        }
        setInitialLoading(false);
      };
      loadSong();
    }
  }, [isEditing, id, getSongById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.album || !formData.genre || !formData.release_date || !formData.artist) {
      setFormError('Todos los campos son requeridos');
      return;
    }

    const payload = {
      title: formData.title,
      album: formData.album,
      genre: formData.genre,
      release_date: new Date(formData.release_date).toISOString(),
      artist: parseInt(formData.artist),
    };

    try {
      if (isEditing && id) {
        await updateSong(parseInt(id), payload);
      } else {
        await createSong(payload);
      }
      navigate('/my-songs');
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  const genres = ['Pop', 'Rock', 'Reggaeton', 'Salsa', 'Bachata', 'Merengue', 'Cumbia', 'Vallenato', 'Electrónica', 'Hip Hop', 'R&B', 'Jazz', 'Clásica', 'Country', 'Indie'];

  if (initialLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Cargando...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="md">
        <Button
          component={RouterLink}
          to="/my-songs"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Volver a Mis Canciones
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <MusicNote sx={{ fontSize: 60, color: '#667eea', mb: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              {isEditing ? 'Editar Canción' : 'Nueva Canción'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {isEditing
                ? 'Actualiza la información de la canción'
                : 'Completa el formulario para subir una nueva canción'}
            </Typography>
          </Box>

          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error || formError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Título de la Canción"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              inputProps={{ maxLength: 100 }}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Álbum"
                  name="album"
                  value={formData.album}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Género"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Artista"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                >
                  {artists.map((artist) => (
                    <MenuItem key={artist.id} value={artist.id}>
                      {artist.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Lanzamiento"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/my-songs')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                  },
                }}
              >
                {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Canción'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SongForm;
