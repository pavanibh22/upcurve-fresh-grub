import { useEffect, useState } from "react";
import { addTokenToHeaders } from "../../services/utils/jwtTokenHelper";
import {
  Box,
  Typography,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import updateStatusApi from "../../services/OrderStatus/updateStatus";
import { toast } from "react-toastify";

const dialogTitleStyles = {
  //backgroundColor: "#4CAF50",
  fontFamily:
    '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
  color: "black",
  fontSize: "20px",
};

const createButtonStyles = {
  fontFamily:
    '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "14px",
  width: "80px",
};

const cancelButtonStyles = {
  fontFamily:
    '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
  backgroundColor: "#f44336",
  color: "white",
  fontSize: "14px",
  width: "80px",
};

const textBoxStyles = {
  "& .MuiFormLabel-root, .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
    {
      fontFamily:
        '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    },
};

const Item = ({
  _id,
  item,
  qty,
  date,
  time,
  orderStatus,
  userId,
  updateStatus,
}) => {
  console.log("item is from items.js from status " + item);
  console.log("Userr id from item.js " + userId);

  if (orderStatus === "") {
    orderStatus = "NotAccepted";
  }

  const [status, setStatus] = useState([
    "Accepted",
    "Preparing",
    "Ready",
    "Order Taken",
  ]);
  const [deleteId, setDeleteId] = useState("");

  const [modal, setModal] = useState({
    update: false,
  });

  const [formData, setFormData] = useState({
    orderId: "",
    status: "",
  });

  //handle here=================================================================================

  const handleUpdate = async () => {
    console.log("formData: ", formData);
    updateStatusApi(userId, formData.orderId, formData.status).then((r) =>
      r.data?.success
        ? (updateStatus(),
          toast.success("Updated status of " + formData.orderId))
        : toast.error("Failed: " + r?.data?.message)
    );
    setModal((prev) => ({ ...prev, update: false }));
  };

  const handleCancel = async () => {
    setFormData({ orderId: "", status: "" });
    setModal((prev) => ({ ...prev, update: false }));
  };

  const addModalCloseCallback = () => {
    console.log("onclose");
    setModal((prev) => ({ ...prev, update: false }));
    setFormData({ status: "", orderId: "" });
  };

  useEffect(() => {
    addTokenToHeaders();
  }, []);

  const { stallId, menuItemName, price, menuItemImage } = item[0];

  return (
    <>
      <tr>
        <td>{_id}</td>
        <td>
          {date[2]}-{date[1]}-{date[0]} at {time[0]}:{time[1]}:{time[2]}
        </td>
        <td>{menuItemName}</td>
        <td>{qty}</td>
        <td>{orderStatus}</td>
        <td>
          <button
            className="statusBtn"
            onClick={() => {
              setModal((prev) => ({ ...prev, update: true }));
            }}
          >
            Update status
          </button>
        </td>
      </tr>
      <Dialog open={modal.update} onClose={addModalCloseCallback}>
        <DialogTitle
          sx={dialogTitleStyles}
        >{`Update status of ${_id}`}</DialogTitle>
        <DialogContent sx={{ paddingTop: "20px !important" }}>
          <Autocomplete
            id="combo-box-demo"
            options={status}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              console.log(newValue);
              if (newValue !== null) {
                setFormData({ orderId: _id, status: newValue });
              } else {
              }
            }}
            getOptionLabel={(option) => {
              return option;
            }}
            renderInput={(params) => (
              <TextField
                sx={{ ...textBoxStyles, width: "350px" }}
                {...params}
                label="Status"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={
              formData?.status === "" || formData?.status === undefined
                ? true
                : false
            }
            onClick={() => handleUpdate()}
            style={createButtonStyles}
          >
            Update
          </Button>
          <Button onClick={handleCancel} style={cancelButtonStyles}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Item;
