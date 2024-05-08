import { Button, Divider, Drawer, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uavCategoryList } from "../../../redux/features/uav/uavActions";
import { getBaseURL } from "../../../helpers/baseUrl";

function UavCategoryCreateDrawer({ open, setOpen }) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(uavCategoryList({}));
  }, []);

  let handleCreateUavCategory = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;

    fetch(`${getBaseURL()}/uav/category/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(uavCategoryList());
        setOpen(false);
      })
      .catch((error) => {});
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      title="Create UAV Category"
      sx={{ maxWidth: "200px" }}
    >
      <form
        style={{ padding: "20px", width: "600px" }}
        onSubmit={handleCreateUavCategory}
      >
        <Typography variant="h6" gutterBottom>
          Create UAV  Category
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
          General
        </Typography>

        <TextField fullWidth id="name" label="Name" sx={{ mt: 2 }} required />
        <TextField
          fullWidth
          id="description"
          label="Description"
          sx={{ mt: 2 }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Create UAV Category
        </Button>
      </form>
    </Drawer>
  );
}

export default UavCategoryCreateDrawer;
