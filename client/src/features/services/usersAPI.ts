import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersAPI = createApi({
    reducerPath: 'usersAPI', // 1
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), // 2
    endpoints: (builder) => ({
        googleLogin: builder.mutation({
            query: () => ({
                url: '/googleSignin',
                method: 'GET',
                mode: 'no-cors',
            }),
            transformResponse: (response: string, meta, arr) => {
                console.log('response', response);
                return response;
            },
        }),
        loginWithUserCredentials: builder.mutation({
            query: (body: object) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            transformResponse: (response: string, meta, arr) => {
                return response;
            },
        }),
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
            transformResponse: (response: string, meta, arr) => {
                console.log('response', response);
                return response;
            },
        }),
    }),
});

export const {
    useGoogleLoginMutation,
    useLoginWithUserCredentialsMutation,
    useRegisterUserMutation,
} = usersAPI;
