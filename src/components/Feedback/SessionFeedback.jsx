import { useState } from "react";
import { motion } from "framer-motion";

export default function SessionFeedback() {
  const [rating, setRating] = useState(0);

  return (
    <motion.div
      style={{ textAlign: "center", padding: "30px" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={{ color: "black" }}>Session Feedback</h2>

      <motion.div
        style={{
          width: "350px",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 15px #034e55ff",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input placeholder="Your Name" type="text" style={inputStyle} />
        <input placeholder="Therapist Name" type="text" style={inputStyle} />

        {/* Star Rating */}
        <div style={{ marginTop: "10px" }}>
          <p style={{ margin: "5px 0", color: "black", fontWeight: "bold" }}>
            Rating:
          </p>

          <div style={{ fontSize: "30px", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  color: star <= rating ? "gold" : "gray",
                  padding: "5px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea placeholder="Comments / Suggestions" rows="3" style={textareaStyle}></textarea>

        {/* Recommend? */}
        <div style={{ textAlign: "left", color: "black" }}>
          <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Would you recommend this therapist?
          </p>

          <label style={{ marginRight: "15px" }}>
            <input type="radio" name="recommend" value="yes" /> Yes
          </label>

          <label>
            <input type="radio" name="recommend" value="no" /> No
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle}
        >
          Submit
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
