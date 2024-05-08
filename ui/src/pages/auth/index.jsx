import React, { useEffect, useState } from "react";
import AuthRouter from "./authRouter";
import { Tab, Tabs } from "@mui/material";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { useLocation, useNavigate } from "react-router-dom";

function Auth() {
  const [tab, setTab] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // navigate on tab change

    if (tab === 0) {
      navigate("/auth/login");
    } else {
      navigate("/auth/register");
    }
  }
  , [tab]);
  
  return (
    <div>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <AuthRouter />
    </div>
  );

}

export default Auth;
