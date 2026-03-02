import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { useArtistStore } from '../../store/artist-store';
import { Artist } from '../../types/artists';
import { useNavigate } from 'react-router-dom';


const ArtistCreate: React.FC = () => {
  const {
    createArtist
  } = useArtistStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    pais: '',
    genero: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const newArtist: Artist = {
      id: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      name: formData.nombre,
      genre: formData.genero,
      country: formData.pais
    }
    createArtist(newArtist);
    navigate('/artist')
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Nuevo Artista
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="País"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Género"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ArtistCreate;
