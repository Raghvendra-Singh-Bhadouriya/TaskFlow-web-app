import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";

const PublicLayout = () => {
    return(
        <>
        <PublicNavbar />
        <Outlet />
        </>
    )
}

export default PublicLayout;