import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthenticationProvider } from "providers/auth/index.tsx";

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
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AuthenticationProvider />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="Loading home page...">
            <Home />
          </Suspense>
        ),
      },

      {
        path: "home",
        element: (
          <Suspense fallback="Loading home page...">
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <div>Custom 404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
