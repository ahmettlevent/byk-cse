import React, { useEffect } from "react";
import Auth from "./pages/auth";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { userGet } from "./redux/features/user/userAction";
import Dashboard from "./pages/dashboard";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!auth.success && !auth.loading) {
      navigate(`/auth/login`);
    }
  }, [auth.success]);

  useEffect(() => {
    if (auth.success && !user.success && !user.loading) {
      dispatch(userGet());
    }
  }, [auth.success, user.success]);

  useEffect(() => {
    if (auth.success && user.success) {
      navigate(`/`);
    }
  }, [auth.success, user.success]);

  return (
    <>
      <CssBaseline enableColorScheme />
      <SnackbarProvider
        transitionDuration={300}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </SnackbarProvider>
    </>
  );
}

export default App;
