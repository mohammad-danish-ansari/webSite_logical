import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./utils/alerts";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
const DashboardLayoutBasic = lazy(() =>
  import("./pages/DashboardLayout/DashboardLayout")
);
const Movie = lazy(() => import("./pages/Movie/Movie"));

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayoutBasic />
                </ProtectedRoute>
              }
            >
              <Route index path="/" element={<Movie />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
