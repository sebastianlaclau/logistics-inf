import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login';
import OrdersListPage from './containers/OrdersListPage'
import SingleOrderPage from './containers/SingleOrderPage';
import Layout from './containers/Layout';

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
                        /* element={<Homepage onLogout={onLogout} />} */
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
        )) || <Login onLoginSuccessful={onLoginSuccessful} />
    );
}

export default App;
