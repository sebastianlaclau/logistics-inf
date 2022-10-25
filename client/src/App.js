import React, { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import LoginPage from './containers/LoginPage';
import OrdersListPage from './containers/OrdersListPage'
import SingleOrderPage from './containers/SingleOrderPage';

function App() {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) setIsUserSignedIn(true);
        else setIsUserSignedIn(false);
    }, []);

    const onLoginSuccessful = () => {
        setIsUserSignedIn(true);
    };

    const onLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        setIsUserSignedIn(false);
    };

    return (
        (isUserSignedIn && (
            <>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout isUserSignedIn={isUserSignedIn} onLogout={onLogout}>
                                <OrdersListPage onLogout={onLogout} />
                            </Layout>
                        }
                    />
                    <Route
                        path="order/:id"
                        element={
                            <Layout isUserSignedIn={isUserSignedIn} onLogout={onLogout}>
                                <SingleOrderPage />
                            </Layout>
                        }
                    />
                </Routes>
            </>
        )) || <LoginPage onLoginSuccessful={onLoginSuccessful} />
    );
}

export default App;
