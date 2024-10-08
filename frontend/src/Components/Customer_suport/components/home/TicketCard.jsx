import React from "react";
import TicketSingleCard from "./TicketSingleCard";
import { Link } from "react-router-dom";

const TicketCard = ({ tickets = [], searchTerm, setSearchTerm }) => {
  const filteredTickets = tickets.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
        />
      </div>

      {/* Ticket cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((item) => (
            <TicketSingleCard key={item._id} ticket={item} />
          ))
        ) : (
          <p className="p-4">No tickets found</p>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
