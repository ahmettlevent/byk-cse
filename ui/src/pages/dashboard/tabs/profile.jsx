import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography, Avatar, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  fontSize: theme.spacing(5),
}));

function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledPaper elevation={3}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <StyledAvatar>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </StyledAvatar>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                Hello, {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user.email}
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
      <Grid item xs={12}>
        <StyledPaper elevation={3}>
          <Typography variant="h6">User Information</Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {user.phone}
          </Typography>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}

export default Profile;
