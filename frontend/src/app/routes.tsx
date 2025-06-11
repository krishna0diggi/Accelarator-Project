import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Home from "./pages/Public/Home";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";
import { useAuth } from "./contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { ROLES } from "./models/roles";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const PublicRoute: React.FC = () => {
    const { isAutheticated, user, isLoading } = useAuth()
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }
    if (user) {
        switch (user.role) {
            case ROLES.ADMIN:
                return <Navigate to="/admin/dashboard" replace />;
            case ROLES.USER:
                return <Navigate to="/employee/my-assets" replace />;
            case ROLES.SUPER_ADMIN:
                return <Navigate to="/superadmin/dashboard" replace />;
            default:
                return <Navigate to="/" replace />;
        }
    }
    return <Outlet />
    // if (isAutheticated) {
    //     return <Navigate to="/" replace />
    // }
    // return children
}
export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps = {}) => {
    const { isAutheticated, user, isLoading } = useAuth()
    const location = useLocation()
    const userRole = user?.role
    console.log(userRole);

    if (!userRole) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (!isAutheticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(userRole)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    if (userRole === ROLES.ADMIN) {
        const fromPath = location.pathname;
        if (fromPath === '/' || fromPath === "/protected" || fromPath === "/home") {
            return <Navigate to="/admin" />
        }
    }
    return <Outlet />
}
export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>


            <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>

            </Route>

            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            

            </Route>


        </Routes>
    )

}
