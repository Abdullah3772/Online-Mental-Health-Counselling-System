import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TherapistLogin({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const DUMMY_USER = {
    username: "therapist@example.com",
    password: "123456",
  };

  const handleLogin = () => {
    if (
      form.username === DUMMY_USER.username &&
      form.password === DUMMY_USER.password
    ) {
      if (onLogin) onLogin();
      navigate("/therapist/dashboard");
    } else {
      alert("Incorrect Username or Password!");
    }
  };

  // **New: Navigate to registration page**
  const handleRegister = () => {
    navigate("/therapist/register");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "800",
            marginBottom: "10px",
            color: "#000",
          }}
        >
          Therapist Login
        </h2>

        <p
          style={{
            color: "black",
            fontSize: "14px",
            background: "#e3fcff",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            boxShadow: "0 0 6px #00d4ff",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          <div>Username: therapist@example.com</div>
          <div>Password: 123456</div>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Username"
            style={inputStyle}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input type="checkbox" style={{ cursor: "pointer" }} />
              Remember Me
            </label>

            <a
              href="#"
              style={{
                color: "#007bff",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            style={buttonStyle}
            onClick={handleLogin}
          >
            Login
          </motion.button>

          {/* **New Register Option** */}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span
              onClick={handleRegister}
              style={{ color: "#00d4ff", cursor: "pointer", fontWeight: "600" }}
            >
              Don't have an account? Register
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
  width: "100%",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#00eaff",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  boxShadow: "0 0 10px #00eaff",
};
