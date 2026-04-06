import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  AdminPanelSettings,
  MusicNote,
} from '@mui/icons-material';
import { useUserStore } from '../../store/user-store';

const UserManagement: React.FC = () => {
  const { users, loading, error, getUsers, createUser, updateUser, deleteUser } = useUserStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    role: 'musical_programmer',
    is_active: true,
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleOpenDialog = (userId?: number) => {
    if (userId) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setEditingUser(userId);
        setFormData({
          username: user.username,
          email: user.email,
          password: '',
          password_confirm: '',
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          is_active: user.is_active,
        });
      }
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: '',
        role: 'musical_programmer',
        is_active: true,
      });
    }
    setFormError('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setFormError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormError('');
  };

  const handleSubmit = async () => {
    if (!editingUser) {
      if (formData.password !== formData.password_confirm) {
        setFormError('Las contraseñas no coinciden');
        return;
      }
      if (formData.password.length < 8) {
        setFormError('La contraseña debe tener al menos 8 caracteres');
        return;
      }
      if (!formData.username || !formData.email || !formData.password) {
        setFormError('Todos los campos son requeridos');
        return;
      }
    }

    try {
      if (editingUser) {
        await updateUser(editingUser, {
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.role as 'administrator' | 'musical_programmer',
          is_active: formData.is_active,
        });
      } else {
        await createUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirm: formData.password_confirm,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.role as 'administrator' | 'musical_programmer',
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteDialog !== null) {
      try {
        await deleteUser(deleteDialog);
        setDeleteDialog(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'administrator' ? <AdminPanelSettings /> : <MusicNote />;
  };

  const getRoleColor = (role: string) => {
    return role === 'administrator' ? 'error' : 'primary';
  };

  const getRoleLabel = (role: string) => {
    return role === 'administrator' ? 'Administrador' : 'Programador Musical';
  };

  if (loading && users.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Skeleton variant="rectangular" height={400} />
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Person sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                  Gestión de Usuarios
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Administra las cuentas de usuarios del sistema
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{
                backgroundColor: 'white',
                color: '#f5576c',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Nuevo Usuario
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getRoleIcon(user.role)}
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.is_active ? 'Activo' : 'Inactivo'}
                        color={user.is_active ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(user.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeleteDialog(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle>
          <DialogContent>
            {formError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formError}
              </Alert>
            )}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            {!editingUser && (
              <>
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ mt: 2 }}
                  helperText="Mínimo 8 caracteres"
                />
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  name="password_confirm"
                  type="password"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  required
                  sx={{ mt: 2 }}
                />
              </>
            )}
            <TextField
              fullWidth
              select
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mt: 2 }}
            >
              <MenuItem value="musical_programmer">Programador Musical</MenuItem>
              <MenuItem value="administrator">Administrador</MenuItem>
            </TextField>
            {editingUser && (
              <TextField
                fullWidth
                select
                label="Estado"
                name="is_active"
                value={formData.is_active ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                sx={{ mt: 2 }}
              >
                <MenuItem value="true">Activo</MenuItem>
                <MenuItem value="false">Inactivo</MenuItem>
              </TextField>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Guardando...' : editingUser ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteDialog !== null} onClose={() => setDeleteDialog(null)}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(null)}>Cancelar</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default UserManagement;
