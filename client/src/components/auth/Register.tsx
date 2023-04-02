import * as yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useRegisterUserMutation } from '../../features/services/usersAPI';
import { useEffect, useState } from 'react';
import {
    isFetchBaseQueryError,
    isErrorWithMessage,
} from '../../features/services/errorHelpers';
import { useSnackbar } from 'notistack';

const validate = yup.object({
    firstName: yup
        .string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: yup
        .string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export default function Register() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        }
    }, [isSuccess]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: validate,
        onSubmit: async (values) => {
            registerUser({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            })
                .unwrap()
                .then((result) => {
                    enqueueSnackbar('Registration successful!', {
                        variant: 'success',
                    });
                })
                .catch((error: { data: { error: string } }) => {
                    if (isFetchBaseQueryError(error)) {
                        enqueueSnackbar(error.data.error, {
                            variant: 'error',
                        });
                    } else if (isErrorWithMessage(error)) {
                        enqueueSnackbar(error.message, {
                            variant: 'error',
                        });
                    }
                });
        },
    });

    return (
        <Grid item xs={12} md={6} lg={4} xl={3} marginTop={12}>
            <Typography variant="h4" component="h1" textAlign={'center'}>
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                    }
                    helperText={
                        formik.touched.firstName && formik.errors.firstName
                    }
                    sx={{ marginBottom: 2, marginTop: 5 }}
                />
                <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="LastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                    }
                    helperText={
                        formik.touched.lastName && formik.errors.lastName
                    }
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Submit
                </Button>

                {isLoading && (
                    <Typography
                        variant="h6"
                        component="h2"
                        textAlign={'center'}
                    >
                        Loading...
                    </Typography>
                )}
            </form>
        </Grid>
    );
}
