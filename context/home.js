import { createContext, useContext, useState } from 'react';

import useModal from 'hooks/useModal';

const Context = createContext();

export function useHomeContext() {
    return useContext(Context);
}

export function HomeProvider({ children }) {
    // true - login
    // false - register
    const [authForm, setAuthForm] = useState(false);
    const authModal = useModal();

    return (
        <Context.Provider value={{
            authForm,
            setAuthForm,
            authModal
        }}>
            {children}
        </Context.Provider>
    );
}