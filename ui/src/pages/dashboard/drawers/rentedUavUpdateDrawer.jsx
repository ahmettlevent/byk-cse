import { Button, Divider, Drawer, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  rentalPost,
  rentalUpdate,
} from "../../../redux/features/rental/rentalActions";

import PropTypes from "prop-types";
import { getBaseURL } from "../../../helpers/baseUrl";

function RentedUavUpdateDrawer({ rentalId, open, setOpen }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();

  let handleUpdateRental = (e) => {
    e.preventDefault();

    dispatch(
      rentalUpdate({
        data: {
          id: rentalId,
          rental_date: formatDate(startDate),
          return_date: formatDate(endDate),
        },
        customUrl: `rental/${rentalId}/update/`,
      })
    );

    setOpen(false);
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
        onSubmit={handleUpdateRental}
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
          size="small"
          sx={{ mt: 3 }}
        >
          Update Rental
        </Button>
      </form>
    </Drawer>
  );
}

RentedUavUpdateDrawer.propTypes = {
  rentalId: PropTypes.number,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default RentedUavUpdateDrawer;
