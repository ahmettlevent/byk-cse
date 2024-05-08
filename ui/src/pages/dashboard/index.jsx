import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Grid,
  Paper,
  Box,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/features/auth/authSlice";
import RentUav from "./tabs/rentUav";
import RentedUav from "./tabs/rentedUav";
import Profile from "./tabs/profile";

const Dashboard = () => {
  const [currTab, setCurrTab] = useState(0);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setCurrTab(newValue);
  };

  const handleLogout = () => {
    dispatch(authLogout());
  };

  return (
    <div>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <Typography variant="h6">UAV Rental Service</Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            style={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} style={{ marginTop: "20px", width: "75%" }}>
        <Grid container spacing={3}>
          <Grid item xs={16}>
            <Paper
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "center",
                boxShadow: 0,
              }}
            >
              <Typography variant="h5">
                Welcome, {user.username} ({user.email})
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Tabs
          value={currTab}
          onChange={handleChange}
          aria-label="dashboard tabs"
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Rent UAV" />
          <Tab label="Rented UAV" />
          <Tab label="Profile" />
        </Tabs>
        <TabPanel value={currTab} index={0}>
          <Typography variant="h5">Available UAV's</Typography>
          <RentUav />
        </TabPanel>
        <TabPanel value={currTab} index={1}>
          <Typography variant="h5">Rented UAV's</Typography>
          <RentedUav />
        </TabPanel>
        <TabPanel value={currTab} index={2}>
          <Typography variant="h5">Profile</Typography>
          <Profile />
        </TabPanel>
      </Container>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{ paddingX: 0, paddingY: 3,width: "100%" }}
    >
      {value === index && (
        <Box sx={{ paddingX: 0, paddingY: 3 }}>{children}</Box>
      )}
    </Container>
  );
}

export default Dashboard;
