import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersAPI } from '../features/services/usersAPI';
import userReducer from '../features/slices/userSlice';
import { authApi } from '../features/services/authAPI';
import authReducer from '../features/slices/authSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
