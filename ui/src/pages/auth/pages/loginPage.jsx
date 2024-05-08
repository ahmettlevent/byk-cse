import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../../redux/features/auth/authActions";
import { authLogout } from "../../../redux/features/auth/authSlice";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const handleSubmit = () => {
    dispatch(authLogin({ username, password }));
  };

  useEffect(() => {
    dispatch(authLogout());
  }, []);

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "100px" }}>
        <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: "bold" }}>
          LOGIN
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>

        <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </Typography>
      </div>
    </Container>
  );
}

export default LoginPage;
