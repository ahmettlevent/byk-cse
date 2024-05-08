import { Button, Divider, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getBaseURL } from "../../../helpers/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  uavCategoryList,
  uavList,
} from "../../../redux/features/uav/uavActions";
import UavCreateDrawer from "../drawers/uavCreateDrawer";
import UavCategoryCreateDrawer from "../drawers/uavCategoryCreateDrawer";
import RentUavDrawer from "../drawers/rentUavDrawer";
import { rentalList } from "../../../redux/features/rental/rentalActions";
import RentedUavUpdateDrawer from "../drawers/rentedUavUpdateDrawer";

const rentUavColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "uav_name",
    headerName: "UAV Name",
    width: 150,
    editable: false,
    renderCell: (params) => {
      return params.row.uav.name;
    },
  },
  {
    field: "uav_price",
    headerName: "UAV Price",
    width: 150,
    editable: false,
    renderCell: (params) => {
      return params.row.uav.price ? params.row.uav.price + " USD" : "N/A";
    },
  },
  {
    field: "rental_date",
    headerName: "Rental Date",
    width: 150,
    editable: false,
  },
  {
    field: "return_date",
    headerName: "Return Date",
    width: 150,
    editable: false,
    flex: 1,
  },
  {
    field: "total_price",
    headerName: "Total Price",
    width: 150,
    editable: false,
    renderCell: (params) => {
      const rentalDate = new Date(params.row.rental_date);
      const returnDate = new Date(params.row.return_date);
      const diffTime = Math.abs(returnDate - rentalDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays * params.row.uav.price + " USD";
    },
  },
];

function RentedUav() {
  let [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  let [rentalId, setRentalId] = useState(null);

  const dispatch = useDispatch();

  const uav = useSelector((state) => state.uav);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const rental = useSelector((state) => state.rental);

  useEffect(() => {
    dispatch(uavList());
    dispatch(rentalList());
  }, []);

  const manageColumns = {
    field: "manage",
    headerName: "Manage",
    width: 230,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <strong>
          <Button
            sx={{ marginRight: "10px" }}
            size="small"
            variant="contained"
            color="error"
            onClick={() => {
              console.log("Delete Rental: ", params.row.id);
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              setRentalId(params.row.id);
              setUpdateDrawerOpen(true);
            }}
          >
            Update
          </Button>
        </strong>
      );
    },
  };

  return (
    <>
      <Typography variant="p" gutterBottom>
        Manage Rented UAVs
      </Typography>
      <Divider />
      <DataGrid
        rows={rental.rentals}
        columns={[...rentUavColumns, manageColumns]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />

      <RentedUavUpdateDrawer
        open={updateDrawerOpen}
        setOpen={setUpdateDrawerOpen}
        rentalId={rentalId}
      />
    </>
  );
}

export default RentedUav;
