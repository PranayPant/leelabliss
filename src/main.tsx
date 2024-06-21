import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";
import { Landing } from "components/landing/index.tsx";
const About = lazy(
  () => import(/* webpackChunkName: "AboutPage" */ "components/about/index.tsx")
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
