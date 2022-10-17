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

function Login({ onLoginSuccessful }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);

    const onSubmit = async (event) => {
        event.preventDefault();
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
                        <InputLabel>Email address</InputLabel>
                        <Input type="email" placeholder="Enter email" onChange={onEmailChange} value={email} />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>{' '}
                    <FormControl sx={{ minWidth: '90%', mb: 3 }}>
                        <InputLabel>Password</InputLabel>
                        <Input type="password" placeholder="Password" onChange={onPasswordChange} value={password} />
                    </FormControl>
                    {hasError && <Alert variant={'danger'}>The email address and password you entered don't match any account. Please try again.</Alert>}
                    <Box width="100%" mt={2}>
                        <Button type="submit" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Login;
