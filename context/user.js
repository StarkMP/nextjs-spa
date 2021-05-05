import UserAccess from 'classes/UserAccess';
import { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext();

export function useUserContext() {
    return useContext(Context);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(UserAccess.get());
    }, []);

    const login = (data) => {
        setUser(data);
        UserAccess.set(data);
    };

    const logout = () => {
        setUser(null);
        UserAccess.logout();
    };

    return (
        <Context.Provider value={{
            user,
            login,
            logout,
        }}>
            {children}
        </Context.Provider>
    );
}