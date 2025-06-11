import { ReactElement, createContext, useContext, useState } from "react";

type LayoutContextType = {
    showAdmin: boolean;
    toggleMenu: () => void;
};

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [showAdmin, setShowAdmin] = useState<boolean>(true)
    const toggleMenu = () => {
        setShowAdmin(prev=> !prev)
    }
    return (
        <LayoutContext.Provider value={{ showAdmin, toggleMenu }}>{children}</LayoutContext.Provider>
    )
}
export const useLayout = () => {
    const context = useContext(LayoutContext);
    if(!context)
    {
        throw new Error('useAuth must be within an AuthProvider')
    }
    return context
}