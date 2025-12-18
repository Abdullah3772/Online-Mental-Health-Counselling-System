import { motion } from "framer-motion";

export default function TherapistRegister() {
  return (
    <motion.div
      style={{ textAlign: "center", padding: "30px" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={{ color: "black" }}>Therapist Registration</h2>

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
          gap: "12px",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input type="text" placeholder="Full Name (user name)" style={inputStyle} />
        <input type="email" placeholder="Email Address" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <input type="password" placeholder="Confirm Password" style={inputStyle} />
        <input type="tel" placeholder="Phone Number" style={inputStyle} />
        <input type="number" placeholder="Years of Experience" style={inputStyle} />
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={fileInputStyle} />

        <label style={{ color: "black", textAlign: "left" }}>Available Time</label>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <input type="time" style={inputStyleWithWidth} />
          <input type="time" style={inputStyleWithWidth} />
        </div>

        <textarea placeholder="Short Bio" rows="3" style={textareaStyle}></textarea>

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
  background: "white",
  fontSize: "14px",
  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
};

const fileInputStyle = {
  ...inputStyle,
  background: "#fff",
};

const inputStyleWithWidth = {
  ...inputStyle,
  width: "100%",
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
