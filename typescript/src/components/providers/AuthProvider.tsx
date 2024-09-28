import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { host } from "@/lib/utils.ts";

interface AuthContextProps {
    authToken: string | null;
    setAuthToken: (token: string) => void;
    isAuthenticated: boolean;
}

// Create the AuthContext with the appropriate type
const AuthContext = createContext<AuthContextProps>({
    authToken: null,
    setAuthToken: () => {},
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(() => {
        return localStorage.getItem('authToken');
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const validateToken = async (token: string) => {
            try {
                const response = await fetch(`${host}/api/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    console.error('Token validation failed', response.statusText);
                    setAuthToken(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Token validation error', error);
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
        <AuthContext.Provider value={{ authToken, setAuthToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);