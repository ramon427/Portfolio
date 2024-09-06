import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem('authToken') || null;
    });
    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [authToken]);


    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
