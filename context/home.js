import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function useHomeContext() {
    return useContext(Context);
}

export function HomeProvider({ children }) {
    // true - login
    // false - register
    const [authForm, setAuthForm] = useState(false);

    return (
        <Context.Provider value={{
            authForm,
            setAuthForm
        }}>
            {children}
        </Context.Provider>
    );
}