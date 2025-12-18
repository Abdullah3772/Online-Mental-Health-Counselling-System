import { motion } from "framer-motion";

export default function Home() {
  const cardStyle = {
    flex: "1 1 150px",
    minWidth: "250px",
    background: "rgba(217, 241, 246, 0.4)", // lighter glass
    padding: "50px",
    borderRadius: "15px",
    backdropFilter: "blur(3px)",
    border: "1px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    color: "#000", // text black
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "30px",
        gap: "20px",
        justifyContent: "center",
        minHeight: "100vh",
       
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Welcome Card */}
      <motion.div
        style={cardStyle}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.03, boxShadow: "0 12px 35px rgba(0,0,0,0.2)" }}
      >
        <h1 style={{ color: "#000", fontSize: "1.7rem" }}>
          Welcome to Online Mental Health Counseling
        </h1>
        <p style={{ marginTop: "12px", fontSize: "1rem", color: "#000" }}>
          Connect with therapists, schedule appointments, provide feedback, 
          and access emergency support anytime.
        </p>
      </motion.div>

      {/* Announcements Card */}
      <motion.div
        style={cardStyle}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.03, boxShadow: "0 12px 35px rgba(0,0,0,0.2)" }}
      >
        <h3 style={{ color: "#000", fontSize: "1.2rem" }}>Announcements</h3>
        <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse", color: "#000" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>Date</th>
              <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>Announcement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px" }}>2025-12-06</td>
              <td style={{ padding: "8px" }}>New therapist added</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>2025-12-05</td>
              <td style={{ padding: "8px" }}>Appointment slots available</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>2025-12-04</td>
              <td style={{ padding: "8px" }}>Emergency hotline updated</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
