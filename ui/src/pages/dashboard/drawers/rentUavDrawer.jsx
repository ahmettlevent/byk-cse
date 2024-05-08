import { Button, Divider, Drawer, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uavCategoryList,
  uavList,
} from "../../../redux/features/uav/uavActions";
import { getBaseURL } from "../../../helpers/baseUrl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function RentUavDrawer({ rentUavId, open, setOpen }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();

  const uav = useSelector((state) => state.uav);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(uavCategoryList({}));
  }, []);

  let handleCreateUav = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uav", rentUavId);
    formData.append("rental_date", formatDate(startDate));
    formData.append("return_date", formatDate(endDate));

    fetch(`${getBaseURL()}/rental/create/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(uavList());
        setOpen(false);
      })
      .catch((error) => {
        // Handle error
      });
  };

  // Format date
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DDTHH:mm:ss[Z]");
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
          Rent UAV
        </Typography>
        <Divider sx={{ my: 1 }} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            sx={{ width: "100%" }}
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Divider sx={{ my: 1 }} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            sx={{ width: "100%" }}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Rent UAV
        </Button>
      </form>
    </Drawer>
  );
}

export default RentUavDrawer;
