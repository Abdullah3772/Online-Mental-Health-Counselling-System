import { motion } from "framer-motion";

export default function UserRegister() {
  return (
    <motion.div
      style={{ textAlign: "center", padding: "30px" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ color: "black", marginBottom: "20px" }}>User Registration</h2>

      <motion.div
        style={{
          width: "350px",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 15px #0c5056ff",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input type="text" placeholder="Name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <input type="password" placeholder="Confirm Password" style={inputStyle} />
        <input type="text" placeholder="Phone Number" style={inputStyle} />
        <input type="date" style={inputStyle} />

        <select style={inputStyle}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <textarea
          placeholder="Address"
          rows="3"
          style={{ ...inputStyle, resize: "none" }}
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle}
        >
          Register
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#00eaff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};
