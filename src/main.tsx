import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";
import { Landing } from "pages/landing/index.tsx";
const About = lazy(
  () => import(/* webpackChunkName: "AboutPage" */ "pages/about/index.tsx")
);

const Home = lazy(
  () => import(/* webpackChunkName: "HomePage" */ "pages/home/index.tsx")
);

const Login = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "pages/login/index.tsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "about",
        element: (
          <Suspense fallback="Loading...">
            <About />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <Suspense fallback="Loading...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback="Loading...">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <div>Custom 404</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
