import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <AppContext.Provider
            value={{
                isLogged,
                setIsLogged,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppcontext() {
    return useContext(AppContext);
}
