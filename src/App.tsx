import { Navbar } from "components/navbar";
import { StripeProvider } from "providers/auth/stripe";
import { AuthenticationProvider } from "providers/auth/user";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AboutPage = lazy(
  () => import(/* webpackChunkName: "AboutPage" */ "pages/about"),
);

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
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense>
              <AboutPage />
            </Suspense>
          }
        />
        <Route element={<AuthenticationProvider />}>
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
            path="/login"
            element={
              <Suspense>
                <LoginPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
