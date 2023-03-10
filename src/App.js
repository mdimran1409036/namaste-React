import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client ";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import * as Foo from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Login from "./components/Login";
import CartItems from "./components/CartItems";
import Profile from "./components/ProfileClass";
import Wrapper from "./components/Wrapper";
import UserContext from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./store/store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
// lazy loading
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
    const [user, setUser] = useState({
        name: "Md Imran Hossain",
        email: "imran.kuet14@gmail.com",
    });
    return (
        <Provider store={store}>
            <UserContext.Provider value={{ user: user, setUser: setUser }}>
                <Header />
                <Wrapper>
                    <Outlet />
                </Wrapper>
                <ToastContainer  autoClose={500} hideProgressBar={true} closeButton={true} draggable={true} pauseOnHover={true} position="bottom-right"/>
                <Foo.Footer />
            </UserContext.Provider>
        </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/about",
                    
                element: (
                    <Suspense fallback={<h1>loading...</h1>}>
                        <About />
                    </Suspense>
                ),
                children: [
                    { path: "profile", element: <Profile name="imran" /> },
                ],
            },
            { path: "/cart", element: <CartItems /> },
            { path: "/", element: <Body /> },
            { path: "/restaurant/:resId", element: <RestaurantMenu /> },
            { path: "/contact", element: <Contact /> },
        ],
    },
    { path: "/login", element: <Login /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
