import {createContext, useContext, useState, useEffect} from "react";
import {host} from "@/lib/utils.ts";

const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem('authToken') || null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const validateToken = async (token) => {
            try {
                const response = await fetch(`${host}/api/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {

                    setIsAuthenticated(true);
                } else {
                    setAuthToken(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error(error);
                setAuthToken(null);
                setIsAuthenticated(false);
            }
        };

        if (authToken) {
            validateToken(authToken);
        } else {
            setIsAuthenticated(false);
        }
    }, [authToken]);
    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{authToken, setAuthToken, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

