import { Box, Button, Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                bgcolor: 'primary.main',
                color: 'white',
                py: 2,
                boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Logo */}
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    MyLogo
                </Typography>

                {/* Navigation Buttons */}
                <Box>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                </Box>
            </Container>
        </Box>
    )
}
