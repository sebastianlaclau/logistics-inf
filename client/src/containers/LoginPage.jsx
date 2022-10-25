import React, { useState } from 'react';
import { login } from '../api/Api';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function LoginPage({ onLoginSuccessful }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasError(false);
        const loginResult = await login({ email, password });
        if (!loginResult) setHasError(true);
        else {
            const { name, token } = loginResult;
            // Save user IDs on local storage
            localStorage.setItem('name', name);
            localStorage.setItem('token', token);
            onLoginSuccessful();
        }
    };

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} sx={{ minHeight: '100vh' }}>
            <Card sx={{ minWidth: '500px' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ ml: 2, mb: 4 }}>
                        Login
                    </Typography>
                    <FormControl sx={{ minWidth: '90%', mb: 3 }}>
                        <InputLabel>Email</InputLabel>
                        <Input type="email" placeholder="Enter email" onChange={onEmailChange} value={email} />
                        <FormHelperText>No compartiremos su email con nadie.</FormHelperText>
                    </FormControl>{' '}
                    <FormControl sx={{ minWidth: '90%', mb: 3 }}>
                        <InputLabel>Clave</InputLabel>
                        <Input type="password" placeholder="Password" onChange={onPasswordChange} value={password} />
                    </FormControl>
                    {hasError && <Alert variant={'danger'}>El email y clave ingresados no coinciden. Por favor inténtelo nuevamente.</Alert>}
                    <Box width="100%" mt={2}>
                        <Button type="submit" onClick={onSubmit}>
                            Enviar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default LoginPage;
