import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import TicketCard from "../components/home/TicketCard";
import { Button, Typography, Box, Tabs, Tab, Grid } from "@mui/material";
import { motion } from "framer-motion";

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [deletedTickets, setDeletedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchTickets();
    fetchDeletedTickets();
  }, []);

  // Fetch active tickets
  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5579/ticket");
      setTickets(response.data.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch deleted tickets
  const fetchDeletedTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5579/ticket/deleted");
      setDeletedTickets(response.data.data);
    } catch (error) {
      console.error("Error fetching deleted tickets:", error);
    }
  };

  // Restore a deleted ticket
  const handleRestore = async (id) => {
    try {
      await axios.put(`http://localhost:5579/ticket/restore/${id}`);
      fetchTickets();
      fetchDeletedTickets();
    } catch (error) {
      console.error("Error restoring ticket:", error);
    }
  };

  // Delete a ticket
  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:5579/ticket/delete/${id}`); // Update the delete API endpoint to mark as deleted
      fetchTickets(); // Refresh the active tickets
      fetchDeletedTickets(); // Refresh the deleted tickets
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  // Filter tickets based on search term
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tickets based on title
  const sortedTickets = filteredTickets.sort((a, b) => {
    return sortAscending
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ background: "#f7f9fc", minHeight: "100vh", padding: "2rem" }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3B82F6, #23A6F0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ticket Management
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#555", fontSize: "1.2rem" }}
        >
          Easily manage all support inquiries, create new tickets, and track
          their status with ease.
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Active Tickets" />
        <Tab label="Deleted Tickets" />
      </Tabs>
      <Button>new</Button>

      {loading ? (
        <Spinner />
      ) : tabIndex === 0 ? (
        <TicketCard
          tickets={sortedTickets}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onDelete={handleDelete}
        />
      ) : (
        <Grid container spacing={3}>
          {deletedTickets.length > 0 ? (
            deletedTickets.map((ticket) => (
              <Grid item xs={12} sm={6} md={4} key={ticket._id}>
                <Box
                  sx={{
                    marginBottom: "1rem",
                    padding: "1.5rem",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {ticket.title} (Deleted)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    <strong>Email:</strong> {ticket.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    <strong>Description:</strong> {ticket.description}
                  </Typography>
                  {ticket.attachment && (
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      <strong>Attachment:</strong>{" "}
                      <a
                        href={ticket.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    <strong>Created At:</strong>{" "}
                    {new Date(ticket.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    <strong>Updated At:</strong>{" "}
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    <strong>Deleted At:</strong>{" "}
                    {new Date(ticket.deletedAt).toLocaleString()}
                  </Typography>
                  <Box textAlign="right" mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleRestore(ticket._id)}
                    >
                      Restore
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No deleted tickets found.</Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Admin;
