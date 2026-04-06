import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
  Divider,
} from '@mui/material';
import {
  EmojiEvents,
  MusicNote,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSongStore } from '../../store/song-store';
import { useArtistStore } from '../../store/artist-store';

const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#667eea', '#764ba2', '#f56565', '#48bb78', '#4299e1', '#9f7aea', '#ed64a6'];

const TopSongs: React.FC = () => {
  const { topSongs, loading, getTopSongs } = useSongStore();
  const { artists, getArtist } = useArtistStore();

  useEffect(() => {
    getTopSongs();
    getArtist();
  }, [getTopSongs, getArtist]);

  const getArtistName = (artistId: number) => {
    const artist = artists.find((a) => a.id === artistId);
    return artist?.name || 'Artista desconocido';
  };

  const chartData = topSongs.map((song, index) => ({
    name: song.title.length > 15 ? song.title.substring(0, 15) + '...' : song.title,
    puntuacion: song.score,
    title: song.title,
    artista: getArtistName(song.artist),
    genero: song.genre,
  }));

  if (loading && topSongs.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Top 10 Canciones Más Puntadas
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
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
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmojiEvents sx={{ fontSize: 50 }} />
            <Box>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Top 10 Canciones Más Puntadas
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Las canciones con mayor puntuación de nuestra plataforma
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp color="primary" />
                <Typography variant="h5" fontWeight="bold">
                  Gráfica de Puntuaciones
                </Typography>
              </Box>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {data.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Artista: {data.artista}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Género: {data.genero}
                              </Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                                Puntuación: {data.puntuacion}
                              </Typography>
                            </Paper>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="puntuacion" radius={[0, 8, 8, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Star sx={{ fontSize: 80, color: '#ccc' }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                    No hay datos disponibles
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ borderRadius: 2, height: '100%' }}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <MusicNote color="primary" />
                  <Typography variant="h5" fontWeight="bold">
                    Ranking
                  </Typography>
                </Box>
              </Box>
              <List sx={{ px: 2 }}>
                {topSongs.map((song, index) => (
                  <React.Fragment key={song.id}>
                    <ListItem
                      sx={{
                        backgroundColor: index < 3 ? `${colors[index]}15` : 'transparent',
                        borderRadius: 2,
                        mb: 1,
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: index < 3 ? `${colors[index]}25` : '#f5f5f5',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            backgroundColor: colors[index % colors.length],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                          }}
                        >
                          {index + 1}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold" noWrap>
                            {song.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary" component="span">
                              {getArtistName(song.artist)}
                            </Typography>
                            <br />
                            <Typography variant="body2" color="text.secondary" component="span">
                              {song.genre}
                            </Typography>
                          </>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star sx={{ color: '#ffc107' }} />
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          {song.score}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < topSongs.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TopSongs;
