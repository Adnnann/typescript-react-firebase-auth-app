import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import Login from './components/auth/Login';
import NavBar from './components/core/NavBar';
import SideBar from './components/Sidebar';
import Spinner from './components/Spiner';
import { LoginWithUserCredentials } from './components/auth/LoginWithUserCredentials';
import Register from './components/auth/Register';

const Posts = React.lazy(() => import('./components/Posts'));

export default function MainRouter() {
    const isLoggedUser = useAppSelector((state) => state.user.loginStatus);

    return (
        <Router>
            <NavBar isLoggedUser={isLoggedUser} />
            {window.location.pathname === '/' || !isLoggedUser ? null : (
                <SideBar />
            )}
            <Routes>
                {!isLoggedUser && <Route path="/" element={<Login />} />}

                <Route
                    path="/posts"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <Posts />
                        </Suspense>
                    }
                />
                <Route path="/login" element={<LoginWithUserCredentials />} />
                <Route path="/register" element={<Register />} />

                <Route path="/contact" element={<div>Contact</div>} />
            </Routes>
        </Router>
    );
}
