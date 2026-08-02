import { useState, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ token, setToken ] = useState(() => localStorage.getItem("token"))
    const [decodedToken, setDecodedToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (token) {
            try {
                const decodeToken = jwtDecode(token);
 
                setDecodedToken(decodeToken);
                setIsAuthenticated(true);

            } catch (err) {
                localStorage.removeItem("token");
                setToken(null);
                setDecodedToken(null);
                setIsAuthenticated(false);
            }
        } else {
            setDecodedToken(null);
            setIsAuthenticated(false);
        }

            setLoading(false);

    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                decodedToken,
                loading,
                token,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};