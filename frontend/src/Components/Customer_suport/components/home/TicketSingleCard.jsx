import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";
import { BiShow, BiTrash } from "react-icons/bi";
import TicketModal from "./TicketModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketReport from "./TicketReport";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

const TicketSingleCard = ({ ticket }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Delete Ticket function
  const handleDeleteTicket = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setLoading(true);
      axios
        .delete(`http://localhost:5579/ticket/${ticket._id}`)
        .then(() => {
          setLoading(false);
          enqueueSnackbar("Ticket deleted successfully", {
            variant: "success",
          });
          navigate("/admin");
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar("Error deleting ticket", { variant: "error" });
          console.error(error);
        });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow duration-200 p-6 m-4 max-w-md">
      {/* Ticket Info */}
      <h4 className="text-gray-400 text-xs mb-2">Ticket ID: {ticket._id}</h4>

      <div className="flex items-center gap-3 mb-4">
        <FaTicketAlt className="text-blue-500 text-2xl" />
        <h2 className="text-2xl font-semibold text-gray-800">{ticket.title}</h2>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <AiOutlineMail className="text-blue-500 text-lg" />
        <a
          href={`mailto:${ticket.email}`}
          className="text-blue-600 hover:underline text-sm"
        >
          {ticket.email}
        </a>
      </div>

      <div className="flex justify-between items-center mt-6 space-x-1">
        {" "}
        {/* Show Details Button */}
        <button
          className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          onClick={() => setShowModal(true)}
        >
          <BiShow className="text-3xl" />
        </button>
        {/* Delete Button */}
        <Button
          color="error"
          startIcon={<BiTrash className="text-3xl" />}
          onClick={handleDeleteTicket}
          disabled={loading}
          className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        ></Button>
        {/* Download Report Button */}
        <PDFDownloadLink
          document={<TicketReport ticket={ticket} />}
          fileName={`ticket_${ticket._id}.pdf`}
        >
          {({ loading: pdfLoading }) => (
            <button className="flex items-center text-black px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors h-12">
              {" "}
              {/* Removed background and changed text color to black */}
              <span>{pdfLoading ? "Loading..." : "PDFDownload"}</span>
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Modal */}
      {showModal && (
        <TicketModal tickets={ticket} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TicketSingleCard;
