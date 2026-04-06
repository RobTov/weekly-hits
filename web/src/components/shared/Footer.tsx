import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { LibraryMusic } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 3,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LibraryMusic />
                        <Typography variant="h6" fontWeight="bold">
                            Weekly Hits
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        © {new Date().getFullYear()} Weekly Hits. Todos los derechos reservados.
                    </Typography>
                    <Box>
                        <MuiLink href="#" color="inherit" sx={{ mx: 1, opacity: 0.9 }}>
                            Términos
                        </MuiLink>
                        <MuiLink href="#" color="inherit" sx={{ mx: 1, opacity: 0.9 }}>
                            Privacidad
                        </MuiLink>
                        <MuiLink href="#" color="inherit" sx={{ mx: 1, opacity: 0.9 }}>
                            Contacto
                        </MuiLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
