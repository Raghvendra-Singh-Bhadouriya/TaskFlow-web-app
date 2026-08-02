import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GroupDetailFetchContext = createContext()

export const GroupDetailFetchProvider = ({ children }) => {
    
    const [ groupDetail, setGroupDetail ] = useState({});

    return(
        <GroupDetailFetchContext.Provider value={{ groupDetail, setGroupDetail }}>
            { children }
        </GroupDetailFetchContext.Provider>
    )
}