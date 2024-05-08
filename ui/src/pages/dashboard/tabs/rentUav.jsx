import { Button, Divider, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getBaseURL } from "../../../helpers/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  uavCategoryDelete,
  uavCategoryList,
  uavDelete,
  uavList,
} from "../../../redux/features/uav/uavActions";
import UavCreateDrawer from "../drawers/uavCreateDrawer";
import UavCategoryCreateDrawer from "../drawers/uavCategoryCreateDrawer";
import RentUavDrawer from "../drawers/rentUavDrawer";
import { rentalDelete } from "../../../redux/features/rental/rentalActions";

const uavColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  { field: "name", headerName: "Name", width: 150, editable: true },
  { field: "model", headerName: "Model", width: 150, editable: true },
  { field: "brand", headerName: "Brand", width: 150, editable: true },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: false,
    valueGetter: (params) => `${params.id} | ${params.name} `,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    editable: true,
    renderCell: (params) => {
      return params.row.price ? params.row.price + " USD" : "N/A";
    },
  },
  { field: "stock", headerName: "Stock", width: 150, editable: true },
  { field: "width", headerName: "Width", width: 150, editable: true },
  { field: "height", headerName: "Height", width: 150, editable: true },
  { field: "weight", headerName: "Weight", width: 150, editable: true },
];

const uavCategoryColumns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
];

function RentUav() {
  let [rentUavId, setRentUavId] = useState(null);
  let [rentUavDrawerOpen, setRentUavDrawerOpen] = useState(false);
  let [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  let [createCategoryDrawerOpen, setCreateCategoryDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const uav = useSelector((state) => state.uav);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(uavList());
    dispatch(uavCategoryList());
  }, []);

  // Update
  let handleUpdateUav = (id, newRow) => {
    const formData = new FormData();
    formData.append("name", newRow.name);
    formData.append("model", newRow.model);
    formData.append("brand", newRow.brand);
    formData.append("category_id", newRow.category.id);
    formData.append("stock", newRow.stock);
    formData.append("width", newRow.width);
    formData.append("height", newRow.height);
    formData.append("weight", newRow.weight);
    formData.append("price", newRow.price);

    fetch(`${getBaseURL()}/uav/${id}/update/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(uavList());
      })
      .catch((error) => {});
  };

  let handleUpdateUavCategory = (id, newRow) => {
    const formData = new FormData();
    formData.append("name", newRow.name);
    formData.append("description", newRow.description);

    fetch(`${getBaseURL()}/uav/category/${id}/update/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(uavCategoryList());
        dispatch(uavList());
      })
      .catch((error) => {});
  };

  // Extra Column for UAV
  const managementColumn = {
    field: "management",
    headerName: "Management",
    width: 230,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              setRentUavDrawerOpen(true);
              setRentUavId(params.id);
            }}
          >
            Rent
          </Button>
          {user.isSuperuser && (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                dispatch(uavDelete({ customUrl: `uav/${params.id}/delete/` }));
              }}
            >
              Delete
            </Button>
          )}
        </>
      );
    },
  };

  // Extra Columns for UAV Category
  const managementCategoryColumn = {
    field: "management",
    headerName: "Management",
    width: 230,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <>
          {user.isSuperuser && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                dispatch(
                  uavCategoryDelete({
                    customUrl: `uav/category/${params.id}/delete/`,
                  })
                );
              }}
            >
              Delete
            </Button>
          )}
        </>
      );
    },
  };

  return (
    <>
      <Typography variant="p" gutterBottom>
        Available UAVs for rent, with their details and rent prices.
      </Typography>

      <Divider sx={{ my: 1 }} />

      {user.isSuperuser && (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{ mb: 2 }}
          onClick={() => setCreateDrawerOpen(true)}
        >
          Add UAV
        </Button>
      )}
      <DataGrid
        rows={uav.uavs}
        columns={[managementColumn, ...uavColumns]}
        pageSize={10}
        rowSelection={false}
        processRowUpdate={(newRow) => {
          handleUpdateUav(newRow.id, newRow);
          return newRow;
        }}
      />
      <Divider sx={{ my: 1 }} />

      {user.isSuperuser && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 5 }}>
            UAV Categories
          </Typography>

          <Typography variant="p" gutterBottom>
            Create and manage UAV categories.
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ mb: 2 }}
            onClick={() => setCreateCategoryDrawerOpen(true)}
          >
            Add Category
          </Button>
          <DataGrid
            rows={uav.categories}
            columns={[managementCategoryColumn, ...uavCategoryColumns]}
            pageSize={5}
            rowSelection={false}
            processRowUpdate={(newRow) => {
              handleUpdateUavCategory(newRow.id, newRow);
              return newRow;
            }}
          />
          <Divider sx={{ my: 1 }} />
        </>
      )}

      <Toolbar />

      <RentUavDrawer
        open={rentUavDrawerOpen}
        setOpen={setRentUavDrawerOpen}
        rentUavId={rentUavId}
      />
      <UavCreateDrawer open={createDrawerOpen} setOpen={setCreateDrawerOpen} />
      <UavCategoryCreateDrawer
        open={createCategoryDrawerOpen}
        setOpen={setCreateCategoryDrawerOpen}
      />
    </>
  );
}

export default RentUav;
