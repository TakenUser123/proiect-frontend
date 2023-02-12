import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/AUTH/Login";
import Register from "../Components/AUTH/Register";
import Comments from "../Components/Comments/Index";
import Dashboard from "../Components/Dashboard/Index";
import Layout from "../Components/Layout/Index";
import Profile from "../Components/Profile/Index";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";


export const router = createBrowserRouter([
    {path: ROOT, element: <Login />},
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Register />},
    {path: PROTECTED, element: <Layout />, children:[
        {
            path: DASHBOARD,
            element: <Dashboard />,
        },
        {
            path: PROFILE,
            element: <Profile />,
        },
        {
            path: COMMENTS,
            element: <Comments/>
        },
]}]);