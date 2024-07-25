import { Navbar } from "components/navbar";
import { StripeProvider } from "providers/auth/stripe";
import { AuthenticationProvider } from "providers/auth/user";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AboutPage = lazy(
  () => import(/* webpackChunkName: "AboutPage" */ "pages/about"),
);

const HomePage = lazy(
  () => import(/* webpackChunkName: "HomePage" */ "pages/home"),
);

const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "pages/login"),
);

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthenticationProvider />}>
          <Route index element={<Navigate to="login" />} />
          <Route element={<StripeProvider />}>
            <Route
              path="/home"
              element={
                <Suspense>
                  <HomePage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="login"
            element={
              <Suspense>
                <LoginPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/about"
          element={
            <Suspense>
              <AboutPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
