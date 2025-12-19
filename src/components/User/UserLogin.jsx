import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function UserLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation
    if (email === "user@example.com" && password === "123456") {
      onLogin(); // App.jsx lo login state update
      navigate("/user/dashboard"); // Dashboard ku redirect
    } else {
      setError("Invalid email or password!");
    }
  };

  // **New: Register button click handler**
  const handleRegisterClick = () => {
    // Navigate to registration page with a query param to auto-open form
    navigate("/user/register?autoOpen=true");
  };

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexDirection: "column",
        gap: "20px",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dummy credentials */}
      <div
        style={{
          background: "rgba(0,0,0,0.1)",
          padding: "10px 20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "#000",
          fontWeight: "600",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <p>Email: <b>user@example.com</b></p>
        <p>Password: <b>123456</b></p>
      </div>

      <motion.div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 0 20px rgba(0, 255, 255,0.7)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "black",
            fontWeight: "800",
            letterSpacing: "1px",
            textShadow: "0 0 8px cyan",
          }}
        >
          User Login
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            placeholder="Email Address"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <span style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
              {error}
            </span>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "-5px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "black",
                fontSize: "14px",
              }}
            >
              <input type="checkbox" style={{ cursor: "pointer" }} />
              Remember Me
            </label>

            <a
              href="#"
              style={{
                color: "black",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.6")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              Forgot Password?
            </a>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={buttonStyle}
          >
            Login
          </motion.button>
        </form>

        {/* **New Register Section** */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p style={{ color: "black", fontSize: "14px" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "cyan", cursor: "pointer", fontWeight: "700" }}
              onClick={handleRegisterClick}
            >
              Register
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px",
  background: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "700",
  background: "linear-gradient(90deg, cyan, #00aaff)",
  color: "#000",
  boxShadow: "0 0 10px cyan",
  transition: "0.3s",
};
