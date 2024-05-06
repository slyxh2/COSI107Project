import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from '../pages/Home';
import { UserContext } from "../context";
import { useEffect, useState } from "react";
import Secret from "../pages/Secret";
import { getCheckAuth } from "../api";

const publicRouter = [
    {
        path: "/",
        element: <Login />,
    }
];

const authRouter = [
    {
        path: "/",
        element: <Home />,
    }
];

const secretRouter = [
    ...authRouter,
    {
        path: "/secret",
        element: <Secret />
    }
]

const getRightRouter = (authLevel) => {
    if (authLevel === 0) return publicRouter;
    if (authLevel === 3) return secretRouter;
    return authRouter;
}

const getLocalUserInf = () => {
    const localUserInf = localStorage.getItem('userInf');
    const defaultUserInf = {
        userName: "",
        userID: "",
        auth: 0
    };
    return localUserInf ? JSON.parse(localUserInf) : defaultUserInf;
}

const Router = () => {
    const [userInf, setUserInf] = useState(getLocalUserInf());
    const [loading, setLoading] = useState(true);
    const [currentRouter, setCurrentRouter] = useState(publicRouter);
    const router = createBrowserRouter(currentRouter);

    const checkAuth = () => {
        if (userInf.auth !== 0) {
            getCheckAuth().then((response) => {
                console.log(response);
                if (!response.error) {
                    setCurrentRouter(getRightRouter(response.role));
                    setLoading(false);
                }
            })
        } else {
            setCurrentRouter(getRightRouter(0));
            setLoading(false);
        }

    }

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    return <>
        <UserContext.Provider value={{ userInf, setUserInf }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    </>
}

export default Router;