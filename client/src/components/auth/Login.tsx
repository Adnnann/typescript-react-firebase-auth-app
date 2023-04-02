import React from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import { auth, FacebookProvider, GoogleProvider } from '../../firebase';
import {
    googleFirebaseAuth,
    userLoginStatus,
} from '../../features/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const googleLogin = async () => {
        try {
            const result: any = await auth.signInWithPopup(GoogleProvider);
            dispatch(googleFirebaseAuth(result.user));
            dispatch(userLoginStatus(true));
        } catch (error) {
            console.log(error);
        }
    };

    const loginWithUserCredentials = () => {
        return navigate('/login');
    };
    const FBLogin = async () => {
        try {
            const result = await auth.signInWithPopup(FacebookProvider);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid item xs={12} md={6} lg={6} xl={3} marginTop={10}>
            <Card style={{ boxShadow: 'none' }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h1"
                        textAlign={'center'}
                    >
                        Login
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <ButtonGroup
                        style={{ boxShadow: 'none' }}
                        orientation="vertical"
                    >
                        <Button
                            variant="contained"
                            onClick={googleLogin}
                            style={{
                                marginBottom: '10px',
                                textTransform: 'none',
                            }}
                        >
                            Google Login
                        </Button>
                        <Button
                            onClick={FBLogin}
                            variant="contained"
                            style={{
                                marginBottom: '10px',
                                textTransform: 'none',
                            }}
                        >
                            Facebook login
                        </Button>
                        <Button
                            onClick={loginWithUserCredentials}
                            variant="contained"
                            style={{ textTransform: 'none' }}
                        >
                            Login with account
                        </Button>
                        <Typography variant="body1" component="p">
                            Do not have an account?{' '}
                            <a href="/register">Register</a>
                        </Typography>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Grid>
    );
};
export default Login;
