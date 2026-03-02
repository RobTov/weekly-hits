import React, { useEffect, useState } from 'react'
import { useSongStore } from '../../store/song-store';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, Paper, Box, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Song } from '../../types/songs';
import { Link } from 'react-router-dom';

const SongsList = () => {
  const {
    songs,
    getSong,
    deleteSong
  } = useSongStore();



  useEffect(() => {
    const onComponentLoad = () => {
      getSong();
    };
    onComponentLoad();
  }, [
    console.log(songs)
  ]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rows, setRows] = useState<Song[]>(songs);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      setRows(rows.filter(row => row.id !== selectedId));
    }
    deleteSong(selectedId!)
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
        <Typography variant="h5">Canciones</Typography>
        <Link to="new" >
          <Button variant="contained" color="primary" >Nueva</Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Álbum</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Fecha de Salida</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Artista</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.album}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>{row.releseDate}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.artist.name}</TableCell>

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
        <DialogTitle>Eliminar Canción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro que desea elminar la canción?
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

export default SongsList
