import { createSlice, PayloadAction } from '@reduxjs/toolkit/';

interface UserState {
    user: object;
    loginStatus: boolean;
}

const initialState: UserState = {
    user: {},
    loginStatus: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        googleFirebaseAuth: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        userLoginStatus: (state, action: PayloadAction<boolean>) => {
            state.loginStatus = action.payload;
        },
    },
});

export const { googleFirebaseAuth, userLoginStatus } = userSlice.actions;
export default userSlice.reducer;
