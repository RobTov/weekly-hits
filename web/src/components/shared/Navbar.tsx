import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  LibraryMusic,
  TrendingUp,
  Person,
  Add,
  ListAlt,
  Logout,
  PersonSearch,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth-store';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
    setMobileMenuAnchor(null);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
    setUserMenuAnchor(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/login');
  };

  const handleMobileItemClick = () => {
    handleMobileMenuClose();
  };

  const isProgrammerOrAdmin = user?.is_musical_programmer || user?.is_administrator;

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LibraryMusic />
          Weekly Hits
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<Home />}
          >
            Inicio
          </Button>
          <Button
            component={Link}
            to="/songs"
            color="inherit"
            startIcon={<LibraryMusic />}
          >
            Canciones
          </Button>
          <Button
            component={Link}
            to="/top-songs"
            color="inherit"
            startIcon={<TrendingUp />}
          >
            Top 10
          </Button>

          {isProgrammerOrAdmin && (
            <>
              <Button
                component={Link}
                to="/my-songs"
                color="inherit"
                startIcon={<ListAlt />}
              >
                Mis Canciones
              </Button>
              <Button
                component={Link}
                to="/songs/create"
                color="inherit"
                startIcon={<Add />}
              >
                Nueva Canción
              </Button>
              <Button
                component={Link}
                to="/artists"
                color="inherit"
                startIcon={<PersonSearch />}
              >
                Artistas
              </Button>
            </>
          )}

          {user?.is_administrator && (
            <Button
              component={Link}
              to="/users"
              color="inherit"
              startIcon={<Person />}
            >
              Usuarios
            </Button>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleUserMenuOpen} size="small">
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontSize: '0.9rem',
                  }}
                >
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {user?.first_name} {user?.last_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @{user?.username}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                    {user?.role === 'administrator' ? 'Administrador' : 'Programador Musical'}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} fontSize="small" />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Iniciar
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Registrarse
              </Button>
            </Box>
          )}
          <IconButton
            color="inherit"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
          {isAuthenticated ? (
            <IconButton onClick={handleUserMenuOpen} size="small">
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  fontSize: '0.9rem',
                }}
              >
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Iniciar Sesión
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Registrarse
              </Button>
            </Box>
          )}
        </Box>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{user?.username}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              {user?.role === 'administrator' ? 'Administrador' : 'Programador Musical'}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} fontSize="small" />
            Cerrar Sesión
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem component={Link} to="/" onClick={handleMobileItemClick}>
            <Home sx={{ mr: 1 }} fontSize="small" />
            Inicio
          </MenuItem>
          <MenuItem component={Link} to="/songs" onClick={handleMobileItemClick}>
            <LibraryMusic sx={{ mr: 1 }} fontSize="small" />
            Canciones
          </MenuItem>
          <MenuItem component={Link} to="/top-songs" onClick={handleMobileItemClick}>
            <TrendingUp sx={{ mr: 1 }} fontSize="small" />
            Top 10
          </MenuItem>
          {isProgrammerOrAdmin && (
            <>
              <Divider />
              <MenuItem component={Link} to="/my-songs" onClick={handleMobileItemClick}>
                <ListAlt sx={{ mr: 1 }} fontSize="small" />
                Mis Canciones
              </MenuItem>
              <MenuItem component={Link} to="/songs/create" onClick={handleMobileItemClick}>
                <Add sx={{ mr: 1 }} fontSize="small" />
                Nueva Canción
              </MenuItem>
              <MenuItem component={Link} to="/artists" onClick={handleMobileItemClick}>
                <PersonSearch sx={{ mr: 1 }} fontSize="small" />
                Artistas
              </MenuItem>
            </>
          )}
          {user?.is_administrator && (
            <MenuItem component={Link} to="/users" onClick={handleMobileItemClick}>
              <Person sx={{ mr: 1 }} fontSize="small" />
              Gestión de Usuarios
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
