import { useContext, createContext, useState, useEffect } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [idToken, setToken] = useState(localStorage.getItem("id_token") || "");
    useEffect(() => {
        getCurrentUser(idToken);
    }, [idToken]);

    const loginAction = async (values) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/authenticate`, values);
            if (res.data) {
                const idToken = res.data.id_token;
                localStorage.setItem('id_token', idToken);
                setToken(idToken);
                window.location.reload();
                return;
            }
            throw new Error(res.message);
        } catch (error) {
            console.dir('Login error:', error);
        }

    };

    const getCurrentUser = async (idToken) => {
        try {
            console.log("getCurrentUser check", idToken);
            await axios.get(`http://localhost:8080/api/account`,
                {
                    headers: { Authorization: `Bearer ${idToken}` }
                }).then(res => {
                    const userData = res.data;
                    setUser(userData)
                    return userData
                }).catch(error => {
                    console.dir('Get current account error:', error);
                });
            return;
        }
        catch (error) {
            console.dir('getCurrentUser error:', error);
        }
    }

    const logoutAction = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("id_token");
        window.location.href = 'http://localhost:3000';
    };

    return (
        <AuthContext.Provider value={{ idToken, user, loginAction, logoutAction, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );

};


export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};