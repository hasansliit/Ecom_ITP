import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSaveTicket = () => {
    // Validate inputs
    if (!title) {
      enqueueSnackbar("Please select a title.", { variant: "warning" });
      return;
    }

    if (!email) {
      enqueueSnackbar("Please enter your email.", { variant: "warning" });
      return;
    }

    if (!validateEmail(email)) {
      enqueueSnackbar("Please enter a valid email address.", {
        variant: "warning",
      });
      return;
    }

    if (!description) {
      enqueueSnackbar("Please fill in the description.", {
        variant: "warning",
      });
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("email", email);
    data.append("description", description);
    if (attachment) {
      data.append("attachment", attachment);
    }

    setLoading(true);
    axios
      .post("http://localhost:5579/ticket", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Ticket created successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error: " + error.message, { variant: "error" });
        console.log(error);
      });
  };

  return (
    <Box
      sx={{ padding: "2rem", backgroundColor: "#f7f9fc", minHeight: "100vh" }}
    >
      <BackButton />
      <Typography
        variant="h4"
        sx={{ marginBottom: "1.5rem", color: "#252B42" }}
      >
        Create Ticket
      </Typography>
      {loading && <Spinner />}
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "16px",
          width: "600px",
          margin: "auto",
        }}
      >
        <div className="my-4">
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", color: "#252B42" }}
          >
            Title
          </Typography>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="" disabled>
              Select an Issue
            </option>
            {[
              "Billing Error",
              "Order Canceled",
              "Order Delayed",
              "Order Not Received",
              "Payment Failed",
              "Product Defect",
              "Product Not as Described",
              "Refund Request",
              "Shipping Damage",
              "Wrong Item Received",
            ]
              .sort()
              .map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
          </select>
        </div>
        <div className="my-4">
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", color: "#252B42" }}
          >
            Email
          </Typography>
          <TextField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "1rem" }}
            placeholder="Enter your email"
          />
        </div>
        <div className="my-4">
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", color: "#252B42" }}
          >
            Description
          </Typography>
          <TextField
            multiline
            rows={4} // Allows for a longer description
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "1rem" }}
            placeholder="Describe your issue in detail"
          />
        </div>
        <div className="my-4">
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", color: "#252B42" }}
          >
            Attachment
          </Typography>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <Button
          variant="contained"
          onClick={handleSaveTicket}
          sx={{
            backgroundColor: "#23A6F0",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1e88e5",
            },
            width: "100%",
            marginTop: "1rem",
          }}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateTicket;
