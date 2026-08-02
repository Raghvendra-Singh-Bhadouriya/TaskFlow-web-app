import { useState, createContext } from "react";


export const SidebarToggleContext = createContext();

export const SidebarToggleContextProvider = ({ children }) => {
    const [ sidebarShow, setSidebarShow ] = useState(false);

    const isSidebarOpen = () => {setSidebarShow(true)};
    const isSidebarClose = () => {setSidebarShow(false)};

    return(
        <SidebarToggleContext.Provider value={{ isSidebarOpen, isSidebarClose, sidebarShow }}>
            { children }
        </SidebarToggleContext.Provider>
    )
}