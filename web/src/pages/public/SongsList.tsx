import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Chip,
  InputAdornment,
  Skeleton,
  Button,
} from '@mui/material';
import {
  MusicNote,
  Album,
  CalendarToday,
  Star,
  Search,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSongStore } from '../../store/song-store';
import { useArtistStore } from '../../store/artist-store';
import { useAuthStore } from '../../store/auth-store';

const SongsList: React.FC = () => {
  const navigate = useNavigate();
  const { songs, loading, getSongs } = useSongStore();
  const { artists, getArtist } = useArtistStore();
  const { user, isAuthenticated } = useAuthStore();
  const [genreFilter, setGenreFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    getSongs();
    getArtist();
  }, [getSongs, getArtist]);

  useEffect(() => {
    if (songs.length > 0) {
      const uniqueGenres = Array.from(new Set(songs.map((song) => song.genre)));
      setGenres(uniqueGenres);
    }
  }, [songs]);

  const filteredSongs = songs.filter((song) => {
    const matchesGenre = genreFilter ? song.genre === genreFilter : true;
    const matchesSearch = searchTerm
      ? song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist_name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesGenre && matchesSearch;
  });

  const getArtistName = (artistId: number) => {
    const artist = artists.find((a) => a.id === artistId);
    return artist?.name || 'Artista desconocido';
  };

  const canAddSong = isAuthenticated && (user?.is_administrator || user?.is_musical_programmer);

  if (loading && songs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Catálogo de Canciones
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Catálogo de Canciones
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Descubre todas las canciones disponibles en nuestra plataforma
              </Typography>
            </Box>
            {canAddSong && (
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
            )}
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Buscar canciones o artistas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Filtrar por Género"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                <MenuItem value="">Todos los géneros</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {filteredSongs.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <MusicNote sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No se encontraron canciones
            </Typography>
            <Typography color="text.secondary">
              Intenta con diferentes criterios de búsqueda
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredSongs.map((song) => (
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
                      {getArtistName(song.artist)}
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
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SongsList;
