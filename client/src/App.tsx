import React, { Suspense, useEffect, useState } from 'react';
// import { auth, FacebookProvider, GoogleProvider } from './firebase';
import MainRouter from './MainRouter';
import theme from './theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Spinner from './components/Spiner';
import { Button, Grid } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <Grid container justifyContent={'center'} spacing={4}>
                    <SnackbarProvider>
                        <MainRouter />
                    </SnackbarProvider>
                </Grid>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default App;
