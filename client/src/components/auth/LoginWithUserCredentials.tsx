import React from 'react';
import * as yup from 'yup';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { TextField, Button, Grid, Card, Typography } from '@mui/material';
import { isErrorWithMessage } from '../../features/services/errorHelpers';
import { useLoginWithUserCredentialsMutation } from '../../features/services/usersAPI';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const LoginWithUserCredentials: React.FC<object> = () => {
    const [loginUser, { isLoading, isSuccess }] =
        useLoginWithUserCredentialsMutation();

    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            loginUser({
                email: values.email,
                password: values.password,
            })
                .unwrap()
                .then((result) => {
                    enqueueSnackbar('Login successful!', {
                        variant: 'success',
                    });
                })
                .catch((error) => {
                    if (isErrorWithMessage(error)) {
                        enqueueSnackbar(error.message, {
                            variant: 'error',
                        });
                    }
                });
        },
    });

    return (
        <Grid item xs={10} md={6} lg={6} xl={3} marginTop={15}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <br />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <Typography
                variant="body1"
                component="p"
                sx={{ textAlign: 'center' }}
            >
                <Typography variant="body1" component="p">
                    Do not have an account? <a href="/register">Register</a>
                </Typography>
            </Typography>
        </Grid>
    );
};
