import { Navbar } from "components/navbar";
import { useIsAuthenticated } from "hooks/auth";
import { StripeProvider } from "providers/auth/stripe";
import { AuthenticationProvider } from "providers/auth/user";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HomePage = lazy(
  () => import(/* webpackChunkName: "HomePage" */ "pages/home"),
);

const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "pages/login"),
);

const LandingPage = lazy(
  () => import(/* webpackChunkName: "LandingPage" */ "pages/landing"),
);

export function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <main className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <LandingPage />
              </Suspense>
            }
          />
          <Route element={<AuthenticationProvider />}>
            <Route
              path="/home"
              element={
                <Suspense>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
