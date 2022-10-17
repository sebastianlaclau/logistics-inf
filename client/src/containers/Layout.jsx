import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LogoInfanti from '../assets/logo-infanti.png';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const mdTheme = createTheme();

export default function Layout({ children, onLogout, isUserSignedIn }) {
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" color="default">
                        <Toolbar sx={{ pr: '24px' }}>
                            <Stack direction="row" width="100%" justifyContent="space-between">
                                <Link to="/">
                                    <Box component="img" sx={{ height: 40 }} alt="Infanti" src={LogoInfanti} pt={1} href="/"></Box>
                                </Link>
                                <Button href="#" variant="outlined" sx={{ my: 1, /* mx: 1.5 */ mr: 1.5 }} onClick={onLogout} size={'small'}>
                                    {isUserSignedIn ? 'Logout' : 'Login'}
                                </Button>
                            </Stack>
                        </Toolbar>
                    </AppBar>

                    <Box component="main" sx={{ backgroundColor: mdTheme.palette.grey[100], flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            {<Toolbar />}
                            <CssBaseline />
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                {children}
                            </Container>

                            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: mdTheme.palette.grey[200] }}>
                                <Container maxWidth="sm">
                                    <Typography variant="body1" textAlign="center" color="text.secondary">
                                        Consolidado ordenes Ecommerce Infanti.
                                    </Typography>
                                </Container>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}
