import React, { useEffect, useState } from 'react'
import { useArtistStore } from '../../store/artist-store';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, Paper, Box, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Artist } from '../../types/artists';

const ArtistsList = () => {

  const {
    artists,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist
  } = useArtistStore();

  const [rows, setRows] = useState<Artist[]>(artists);


  useEffect(() => {
    const onComponentLoad = () => {
      getArtist();
    };
    onComponentLoad();
  }, [
    console.log(artists)
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      setRows(rows.filter(row => row.id !== selectedId));
    }
    deleteArtist(selectedId!)
    setOpen(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      {/* Title and New Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 5, width: 1600 }}>
        <Typography variant="h5">Artistas</Typography>
        <Button variant="contained" color="primary">Nuevo</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Delete Dialog */}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Eliminar Artista</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro que desea elminar el artista?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

export default ArtistsList
