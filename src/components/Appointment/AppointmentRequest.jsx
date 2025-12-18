import { useState } from "react";
import { motion } from "framer-motion";

export default function EmergencySupport() {
  const [contactMethod, setContactMethod] = useState("");

  return (
    <motion.div
      style={{ textAlign: "center", padding: "30px" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={{ color: "black" }}>Emergency Support</h2>

      <motion.div
        style={{
          width: "350px",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 15px #00eaff",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input placeholder="Your Name" style={inputStyle} />
        <input placeholder="Contact Number" type="tel" style={inputStyle} />

        <select style={selectStyle}>
          <option value="">Select Type of Emergency</option>
          <option value="suicidal">Suicidal Thoughts</option>
          <option value="panic">Panic Attack</option>
          <option value="violent">Violence / Abuse</option>
          <option value="selfharm">Self-Harm Risk</option>
          <option value="medical">Medical Emergency</option>
          <option value="other">Other</option>
        </select>

        <div style={{ textAlign: "left", color: "black" }}>
          <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Preferred Contact Method:</p>
          <label style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="contactMethod"
              value="call"
              onChange={() => setContactMethod("call")}
            />{" "}
            Call
          </label>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="chat"
              onChange={() => setContactMethod("chat")}
            />{" "}
            Chat
          </label>
        </div>

        <textarea
          placeholder="Describe the Emergency"
          rows="3"
          style={textareaStyle}
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle}
        >
          Send Alert
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
  background: "white",
  fontSize: "14px",
  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
};

const selectStyle = {
  ...inputStyle,
  color: "black",
  cursor: "pointer",
};

const textareaStyle = {
  ...inputStyle,
  resize: "none",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#00eaff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0 0 10px #00eaff",
};
