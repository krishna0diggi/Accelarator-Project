import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { LoginCredentials, SignUpCredentials, User } from "../models/authType";
import api from "../service/api";
import { toast } from "react-toastify";
type AuthContextType = {
    user: User | null;
    token: string | null;
    isAutheticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignUpCredentials) => Promise<void>;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isAutheticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token && !user) {
            fetchCurrentUser()
        }
    }, [token, user])
    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/auth/login', credentials);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            setIsAuthenticated(true);
            fetchCurrentUser()
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    const signup = async (data: SignUpCredentials) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/auth/register', data);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            setIsAuthenticated(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null)
        setIsAuthenticated(false)
    }

    const fetchCurrentUser = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const fetchCurrentUser = response.data.data;
            setUser(fetchCurrentUser)
            setIsAuthenticated(true)
        } catch (error: any) {
            setUser(null); // Optional: clear user on failure
            setIsAuthenticated(false); // Optional
            toast.error(error.response?.data?.message || 'Failed to fetch user');
        }
        finally {
            setLoading(false)
        }
    };
    const value = {
        user,
        token,
        isAutheticated,
        isLoading,
        error,
        login,
        signup,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be within an AuthProvider')
    }
    return context
}