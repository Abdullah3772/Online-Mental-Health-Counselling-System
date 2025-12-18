import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MotionLink = motion(Link);

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTherapistMenu, setShowTherapistMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef(null);
  const userRef = useRef(null);
  const therapistRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
      if (therapistRef.current && !therapistRef.current.contains(e.target)) setShowTherapistMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div style={{ background: "transparent", paddingBottom: "15px" }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "15px 10px",
        fontSize: "45px",
        fontWeight: "bold",
        color: "#000",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(5px)",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
      }}>
        Online Mental Health Counseling System
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "center", // center everything horizontally
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
        padding: "10px 20px",
      }}>
        {/* Profile */}
        <div style={{ position: "relative" }} ref={profileRef}>
          <motion.img
            src="https://randomuser.me/api/portraits/men/7.jpg"
            alt="User"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid #00ffd6",
            }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            whileHover={{ scale: 1.1 }}
          />
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                style={{ ...dropdownStyle, top: "48px", left: "50%", transform: "translateX(-50%)" }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                transition={{ duration: 0.2 }}
              >
                <MotionLink to="/user/profile" style={dropdownLink}>Edit Profile</MotionLink>
                <MotionLink to="/logout" style={dropdownLink}>Logout</MotionLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Links */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <MotionLink to="/" style={navButtonStyle}>Home</MotionLink>

          {/* User Dropdown */}
          <div style={{ position: "relative" }} ref={userRef}>
            <motion.button
              style={navButtonStyle}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              User ▼
            </motion.button>
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  style={{ ...dropdownStyle, top: "38px", left: "50%", transform: "translateX(-50%)" }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <MotionLink to="/user/register" style={dropdownLink}>Register</MotionLink>
                  <MotionLink to="/user/login" style={dropdownLink}>Login</MotionLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Therapist Dropdown */}
          <div style={{ position: "relative" }} ref={therapistRef}>
            <motion.button
              style={navButtonStyle}
              onClick={() => setShowTherapistMenu(!showTherapistMenu)}
            >
              Therapist ▼
            </motion.button>
            <AnimatePresence>
              {showTherapistMenu && (
                <motion.div
                  style={{ ...dropdownStyle, top: "38px", left: "50%", transform: "translateX(-50%)" }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                >
                  <MotionLink to="/therapist/register" style={dropdownLink}>Register</MotionLink>
                  <MotionLink to="/therapist/login" style={dropdownLink}>Login</MotionLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MotionLink to="/appointment" style={navButtonStyle}>Appointment</MotionLink>
          <MotionLink to="/feedback" style={navButtonStyle}>Feedback</MotionLink>
          <MotionLink to="/emergency" style={navButtonStyle}>Emergency</MotionLink>
        </div>
      </div>
    </div>
  );
}

// Styles
const navButtonStyle = {
  color: "#052b2fff",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "8px 16px",
  background: "rgba(81, 236, 244, 0.7)",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  whiteSpace: "nowrap",
  transition: "all 0.2s ease",
};

const dropdownStyle = {
  position: "absolute",
  background: "rgba(83, 84, 84, 0.9)",
  borderRadius: "12px",
  padding: "10px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: "150px",
  zIndex: 100,
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
  whiteSpace: "nowrap",
};

const dropdownLink = {
  color: "#badee1ff",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
  transition: "color 0.2s ease",
};
