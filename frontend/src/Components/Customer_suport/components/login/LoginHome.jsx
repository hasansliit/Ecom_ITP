import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiChat } from "react-icons/bi";
import { motion } from "framer-motion";
import Image1 from "./Image/cus3.jpg";

function LoginHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:5579/user", { withCredentials: true })
        .then((response) => {
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            navigate("/login");
          }
        })
        .catch(() => navigate("/login"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FCFAEE]">
        <h1 className="text-2xl font-bold text-[#252B42]">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Half with Background Image */}
      <div
        className="w-1/2 bg-cover bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${Image1})` }}
      >
        {/* Decorative Background Shapes */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#98DED9] opacity-30 blur-3xl z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 rounded-full bg-[#98DED9] opacity-20 blur-2xl z-10 transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Right Half with Welcome Message and Card */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#E0F7FA]">
        {" "}
        {/* Updated Background Color */}
        {/* Animated Welcome Message */}
        <motion.p
          className="text-[#252B42] text-4xl font-bold mb-8 drop-shadow-lg text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Support Ticket, {user && user.name}!
        </motion.p>
        <motion.div
          className="relative bg-white shadow-lg rounded-3xl p-10 text-center max-w-lg w-full transition-transform duration-300 transform hover:scale-105 hover:shadow-xl z-10"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient Background Inside the Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#23A6F0] to-[#FCFAEE] opacity-80 rounded-3xl z-[-1]"></div>

          {user && user.role === "ADMIN" && (
            <motion.div
              onClick={() => navigate("/admin")}
              className="cursor-pointer text-lg text-white hover:text-gray-800 transition-all duration-300 mb-4 p-4 rounded-lg bg-[#23A6F0] shadow-md hover:shadow-lg transform"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Tickets
            </motion.div>
          )}

          {user && user.role === "CUSTOMER" && (
            <div className="flex flex-col items-center gap-4">
              {/* My Tickets */}
              <motion.div
                onClick={() => navigate("/home")}
                className="cursor-pointer text-lg text-white hover:text-gray-800 transition-all duration-300 mb-4 p-4 rounded-lg bg-[#23A6F0] shadow-md hover:shadow-lg transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                My Tickets
              </motion.div>

              {/* Chatbot Navigation */}
              <motion.div
                onClick={() => navigate("/chatbot")}
                className="cursor-pointer flex items-center justify-center gap-2 text-lg text-white hover:text-gray-800 transition-all duration-300 mb-4 p-4 rounded-lg bg-[#23A6F0] shadow-md hover:shadow-lg transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <BiChat className="text-3xl" />
                Chat with ECo
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default LoginHome;
