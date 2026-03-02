import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Centered navigation links */}
        <Box sx={{ display: 'flex', gap: 3, margin: '0 auto' }}>
          <Link to="" > <Button color="inherit">   Inicio</Button> </Link>
          <Link to="songs" ><Button color="inherit">Canciones</Button> </Link>
          <Link to="artist" > <Button color="inherit">Artistas</Button></Link>
          <Button color="inherit">Gráficas</Button>
        </Box>

        {/* Right-aligned login button */}
        <Box sx={{ marginLeft: 'auto' }}>
          <Button color="inherit">Log-In</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );

}
