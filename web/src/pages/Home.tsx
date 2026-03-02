import React from 'react'
import { Box, Typography, Button, Grid, Paper } from '@mui/material';


export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      {/* Hero Section */}
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundImage: 'url("https://source.unsplash.com/1600x400/?music,concert")', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', }} >
        <Typography variant="h3" gutterBottom> Weekly Hits </Typography>
        <Typography variant="h6" gutterBottom> Tu sitio para descubrir canciones y artistas destacados </Typography>
        <Button variant="contained" color="primary"> Explorar Canciones </Button>
      </Paper> {/* Info Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom> Canciones Populares </Typography>
            <Typography> Descubre las canciones más escuchadas de la semana, con información sobre sus artistas y géneros. </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom> Artistas Destacados </Typography>
            <Typography> Conoce a los artistas que están marcando tendencia en la música actual. </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h4" gutterBottom> ¡Explora la música que mueve al mundo! </Typography>
        <Button variant="outlined" color="secondary"> Ver Gráficas </Button> </Box> </Box>
  )
}
