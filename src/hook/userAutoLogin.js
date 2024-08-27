import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

const useAutoLogin = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
///
    useEffect(() => {
        // IIFE
        (async function autoLoginApiCall() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/refresh`, {
                    withCredentials: true
                });
                
                if (response.status === 200) {
                    // 1. setUser
                    const user = {
                        id: response.data.user.id,
                        email: response.data.user.email,
                        username: response.data.user.username,
                        auth: response.data.auth
                    };
                    dispatch(setUser(user));
                    console.log(user, 'helllllllllllllo');
                    
                }
            } catch (error) {
                // Log the error and possibly handle different cases
                // console.error('Auto login failed:', error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return loading;
}

export default useAutoLogin;
