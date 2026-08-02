import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import SignUp from "../pages/SignUp";
import MyTask from "../pages/MyTask";
import LandingPage from "../pages/LandingPage";
import PublicLayout from "./PublicLayout";
import AppLayout from "./AapLayout";
import SignIn from "../pages/SignIn";
import GroupWorkspace from "../Group/GroupWorkspace";
import GroupMembers from "../Group/groupMembers";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/Profile";
import SingleTask from "../task/SingleTask";




const AllRoutes = () => {

    return(
    <>
        <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Route>

            {/* PRIVATE ROUTES */}
            <Route element={<AppLayout />}>
                <Route 
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/group/:groupId"
                    element={
                        <PrivateRoute>
                            <GroupWorkspace />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/group/single-task/:id"
                    element={
                        <PrivateRoute>
                            <SingleTask />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/group/:groupId/members"
                    element={
                        <PrivateRoute>
                            <GroupMembers />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my_task"
                    element={
                        <PrivateRoute>
                            <MyTask />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    </>
    )
}

export default AllRoutes;