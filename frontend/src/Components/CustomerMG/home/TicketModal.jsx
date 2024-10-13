import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TicketModal = ({ tickets, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-50 inset-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-lg p-6 relative shadow-xl"
      >
        {/* Close Button */}
        <AiOutlineClose
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={onClose}
        />

        {/* Issue Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {tickets.issue}
        </h2>
        <h4 className="text-gray-500 mb-4">ID: {tickets._id}</h4>

        {/* Ticket Title */}
        <div className="flex items-center gap-3 mb-4">
          <PiBookOpenTextLight className="text-blue-500 text-2xl" />
          <h2 className="text-lg text-gray-800">{tickets.title}</h2>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 mb-4">
          <AiOutlineMail className="text-blue-500 text-2xl" />
          <h2 className="text-lg text-gray-800">{tickets.email}</h2>
        </div>

        {/* Ticket Description */}
        <div className="flex items-center gap-3 mb-4">
          <PiBookOpenTextLight className="text-blue-500 text-2xl" />
          <h2 className="text-lg text-gray-800">{tickets.description}</h2>
        </div>

        {/* Created At */}
        <div className="flex items-center gap-3 mb-4">
          <AccessTimeIcon className="text-blue-500 text-2xl" />
          <h2 className="text-lg text-gray-800">
            Created: {new Date(tickets.createdAt).toLocaleString()}
          </h2>
        </div>

        {/* Updated At */}
        <div className="flex items-center gap-3 mb-4">
          <AccessTimeIcon className="text-blue-500 text-2xl" />
          <h2 className="text-lg text-gray-800">
            Updated: {new Date(tickets.updatedAt).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
