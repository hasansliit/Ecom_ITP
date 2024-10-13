import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const TicketTable = ({ tickets }) => {
  // Changed prop name from ticket to tickets
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 round-md">No</th>
          <th className="border border-slate-600 round-md">Title</th>
          <th className="border border-slate-600 round-md max-md:hidden">
            Email
          </th>
          <th className="border border-slate-600 round-md">Date</th>
          <th className="border border-slate-600 round-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(
          (
            ticket,
            index // Ensure using the correct prop name
          ) => (
            <tr key={ticket._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {ticket.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {ticket.email}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/ticket/details/${ticket._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/ticket/edit/${ticket._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/ticket/delete/${ticket._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default TicketTable;
