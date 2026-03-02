import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper
} from '@mui/material';
import { useSongStore } from '../../store/song-store';
import { Song } from '../../types/songs';
import { useNavigate } from 'react-router-dom';
import { Artist } from '../../types/artists';


const SongCreate: React.FC = () => {
    const {
        createSong
    } = useSongStore();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        album: '',
        genero: '',
        fecha: '',
        score: 0,
        artista: {}
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
        const newSong: Song = {
            id: Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
            title: formData.titulo,
            album: formData.album,
            genre: formData.genero,
            releseDate: formData.fecha,
            score: formData.score,
            artist: formData.artista as Artist
        }
        createSong(newSong);
        navigate('/songs')
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Nueva Canción
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Título"
                            name="titlulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Álbum"
                            name="album"
                            value={formData.album}
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
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Fecha de Salida"
                            name="rdate"
                            value={formData.fecha}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Score"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Artista"
                            name="artist"
                            value={formData.artista}
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

export default SongCreate;
