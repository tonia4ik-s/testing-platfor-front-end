import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ThemeProvider from '../../../theme'
import Image from '../../../assets/sign-in.jfif'
import LoginForm from "./LoginForm";
import {Link as RouterLink} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center"  {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/tonia4ik-s">
                GitHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Login() {
    return (
        <ThemeProvider>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundImage: `url(${Image})`,
                        width: `100vw`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 20,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" textAlign="center" gutterBottom>
                            Sign In
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

                        <LoginForm />

                        <Typography variant="body2" align="right" sx={{ mt: 2 }}>
                            Don’t have an account?{' '}
                            <Link variant="subtitle2" component={RouterLink} to="/register">
                                Get started
                            </Link>
                        </Typography>

                        <Copyright sx={{mt: 5}} />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
