import {
  Button,
  Container,
  Divider,
  Drawer,
  FormControl,
  Input,
  InputLabel,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uavCategoryList,
  uavList,
} from "../../../redux/features/uav/uavActions";
import { getBaseURL } from "../../../helpers/baseUrl";

function UavCreateDrawer({ open, setOpen }) {
  const dispatch = useDispatch();

  const uav = useSelector((state) => state.uav);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    open && dispatch(uavCategoryList());
  }, [open]);

  let handleCreateUav = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const model = e.target.model.value;
    const brand = e.target.brand.value;
    const category = e.target.category.value;
    const stock = e.target.stock.value;
    const width = e.target.width.value;
    const height = e.target.height.value;
    const weight = e.target.weight.value;
    const price = e.target.price.value;

    fetch(`${getBaseURL()}/uav/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify({
        name,
        model,
        brand,
        category_id: category,
        stock,
        width,
        height,
        weight,
        price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(uavList());
        setOpen(false);
      })
      .catch((error) => {});
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      title="Create UAV"
      sx={{ maxWidth: "200px" }}
    >
      <form
        style={{ padding: "20px", width: "600px" }}
        onSubmit={handleCreateUav}
      >
        <Typography variant="h6" gutterBottom>
          Create UAV
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
          General
        </Typography>

        <TextField fullWidth id="name" label="Name" sx={{ mt: 2 }} required />
        <TextField fullWidth id="model" label="Model" sx={{ mt: 2 }} required />
        <TextField fullWidth id="brand" label="Brand" sx={{ mt: 2 }} required />

        <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
          <InputLabel htmlFor="category" variant="outlined" sx={{ p: 0, m: 0 }}>
            Category
          </InputLabel>
          <Select native id="category" input={<Input />} variant="outlined">
            {uav.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom sx={{ mt: 5, p: 0 }}>
          Specifications
        </Typography>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="stock">Stock</InputLabel>
          <Input id="stock" type="number" required />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="width">Width</InputLabel>
          <Input id="width" type="number" required />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="height">Height</InputLabel>
          <Input id="height" type="number" required />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="weight">Weight</InputLabel>
          <Input id="weight" type="number" required />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
          <InputLabel htmlFor="price" sx={{ p: 0, m: 0 }}>
            Price
          </InputLabel>
          <Input id="price" type="number" required />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Create UAV
        </Button>
      </form>
    </Drawer>
  );
}

export default UavCreateDrawer;
