import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import TicketTable from "../components/home/TicketTable"; // Assuming you have this component
import { Typography, Box, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

const Home = () => {
  const [tickets, setTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5579/ticket")
      .then((response) => {
        setTicket(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      });
  }, []);

  const sortedTickets = tickets.sort((a, b) => {
    return sortAscending
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return (
    <div
      style={{
        background: "#f8fafc", // Softer background color for modern feel
        minHeight: "100vh",
        padding: "3rem 1.5rem",
        position: "relative",
      }}
    >
      {/* Hero Section */}
      <Box textAlign="center" mb={8} sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              background: "linear-gradient(90deg, #3B82F6, #23A6F0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Support Ticket
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "#64748B",
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: "800px",
              margin: "auto",
            }}
          >
            Manage support inquiries efficiently, create new tickets, and track
            progress, all in one streamlined interface.
          </Typography>
        </motion.div>
      </Box>

      {/* Ticket List Section with New Ticket Button */}
      <Box
        mb={6}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px", // Adjust space below this section
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#0F172A",
            fontWeight: "bold",
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          Current Tickets
        </Typography>

        {/* Larger New Ticket Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            component={Link}
            to="/ticket/create"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1.25rem", // Larger font size
              padding: "0.75rem 2rem", // Increased padding for larger button
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)",
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
          >
            <MdOutlineAddBox size={28} style={{ marginRight: "0.75rem" }} />{" "}
            {/* Larger icon */}
            New Ticket
          </Button>
        </motion.div>
      </Box>

      {/* Ticket List */}
      <Grid container spacing={4} justifyContent="center">
        {loading ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Spinner />
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TicketTable tickets={sortedTickets} />
          </Grid>
        )}
      </Grid>

      <div>
        {/* Footer Section */}
        <footer className="absolute bottom-0 w-full text-[#FFFFFF] text-sm mb-4 opacity-90 bg-[#252B42] p-3 rounded-md text-center">
          <p>© 2024 Customer Support. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
