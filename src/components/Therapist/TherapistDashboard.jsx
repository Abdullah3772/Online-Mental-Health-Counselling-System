import { useState, useRef, useEffect } from "react";

export default function TherapistDashboard() {
  const [menu, setMenu] = useState("dashboard");
  const [chatMessage, setChatMessage] = useState("");
  const [chats, setChats] = useState([
    { from: "patient", text: "Hello doctor" },
    { from: "you", text: "Hi, how can I help?" },
  ]);

  const chatEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  function sendChat() {
    if (!chatMessage.trim()) return;
    setChats([...chats, { from: "you", text: chatMessage }]);
    setChatMessage("");
  }

  function logout() {
    alert("Logging out (dummy)");
  }

  return (
    <div style={styles.container}>
      {/* MOBILE TOP MENU */}
      <div style={styles.mobileMenu}>
        <select
          style={styles.mobileSelector}
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        >
          <option value="dashboard">Dashboard</option>
          <option value="appointments">Appointments</option>
          <option value="chat">Chat</option>
          <option value="profile">Profile</option>
        </select>
      </div>

      {/* LEFT SIDEBAR (DESKTOP ONLY) */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Therapist Panel</h2>

        {["dashboard", "appointments", "chat", "profile"].map((m) => (
          <button
            key={m}
            style={{
              ...styles.menuBtn,
              background: menu === m ? "#4b5563" : "#374151",
            }}
            onClick={() => setMenu(m)}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </aside>

      {/* RIGHT CONTENT */}
      <main style={styles.content}>
        {menu === "dashboard" && <DashboardPage />}
        {menu === "appointments" && <AppointmentsPage />}
        {menu === "chat" && (
          <ChatPage
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            chats={chats}
            sendChat={sendChat}
            chatEndRef={chatEndRef}
          />
        )}
        {menu === "profile" && <ProfilePage />}
      </main>
    </div>
  );
}

/* -------------------------------------
      DASHBOARD PAGE
-------------------------------------- */
function DashboardPage() {
  return (
    <div style={styles.page}>
      <h1>Welcome, Therapist 👋</h1>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>12</h2>
          <p>Today's Appointments</p>
        </div>
        <div style={styles.statCard}>
          <h2>5</h2>
          <p>Pending Requests</p>
        </div>
        <div style={styles.statCard}>
          <h2>27</h2>
          <p>Total Patients</p>
        </div>
      </div>

      <h3 style={{ marginTop: 25 }}>Notifications</h3>
      <div style={styles.notificationItem}>
        New appointment request from <b>Ali</b>.
      </div>
      <div style={styles.notificationItem}>
        Session completed with <b>Rashid</b>.
      </div>
    </div>
  );
}

/* -------------------------------------
      APPOINTMENTS PAGE
-------------------------------------- */
function AppointmentsPage() {
  return (
    <div style={styles.page}>
      <h1>Appointments</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Ali</td>
            <td>10 Dec, 3:00 PM</td>
            <td>Pending</td>
            <td>
              <button
                style={styles.btnPrimary}
                onClick={() => alert("Approved (dummy)")}
              >
                Approve
              </button>
            </td>
          </tr>
          <tr>
            <td>Rashid</td>
            <td>10 Dec, 5:00 PM</td>
            <td>Confirmed</td>
            <td>
              <button
                style={styles.btnSecondary}
                onClick={() => alert("Session Started (dummy)")}
              >
                Start Session
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------
      CHAT PAGE
-------------------------------------- */
function ChatPage({ chatMessage, setChatMessage, chats, sendChat, chatEndRef }) {
  return (
    <div style={styles.page}>
      <h1>Live Chat</h1>

      <div style={styles.chatBox}>
        <div style={styles.chatMessages}>
          {chats.map((c, i) => (
            <div
              key={i}
              style={
                c.from === "patient"
                  ? styles.chatBubblePatient
                  : styles.chatBubbleYou
              }
            >
              {c.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div style={styles.chatComposer}>
          <input
            placeholder="Type a message..."
            style={styles.chatInput}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button style={styles.btnPrimary} onClick={sendChat}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------
      PROFILE PAGE
-------------------------------------- */
function ProfilePage() {
  return (
    <div style={styles.page}>
      <h1>Profile Settings</h1>

      <div style={styles.section}>
        <label>Name</label>
        <input style={styles.formInput} placeholder="Therapist Name" />

        <label>Specialization</label>
        <input style={styles.formInput} placeholder="Psychologist / Counselor" />

        <label>Experience</label>
        <input style={styles.formInput} placeholder="5 years" />

        <button
          style={styles.btnPrimary}
          onClick={() => alert("Profile updated")}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------
      STYLES
-------------------------------------- */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#f2f5f9",
  },

  /* MOBILE */
  mobileMenu: {
    display: "none",
  },

  mobileSelector: {
    width: "100%",
    padding: 12,
    fontSize: 16,
  },

  /* SIDEBAR */
  sidebar: {
    width: 250,
    background: "#1f2937",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  logo: {
    fontSize: 22,
    marginBottom: 20,
  },

  menuBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    textAlign: "left",
  },

  logoutBtn: {
    marginTop: "auto",
    background: "#dc2626",
    padding: "10px 14px",
    borderRadius: 6,
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
  },

  page: {
    paddingBottom: 40,
  },

  /* DASHBOARD */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 20,
  },

  statCard: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },

  /* APPOINTMENTS */
  table: {
    width: "100%",
    background: "white",
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
  },

  /* CHAT */
  chatBox: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },

  chatMessages: {
    maxHeight: 280,
    overflowY: "auto",
    padding: 10,
    marginBottom: 15,
    background: "#f7faff",
    borderRadius: 8,
  },

  chatBubblePatient: {
    padding: "10px 14px",
    background: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 8,
    width: "fit-content",
  },

  chatBubbleYou: {
    padding: "10px 14px",
    background: "#a5b4fc",
    borderRadius: 8,
    marginBottom: 8,
    width: "fit-content",
    marginLeft: "auto",
  },

  chatComposer: {
    display: "flex",
    gap: 10,
  },

  chatInput: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  /* PROFILE */
  formInput: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    border: "1px solid #ccc",
  },

  btnPrimary: {
    background: "#2563eb",
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  btnSecondary: {
    background: "#10b981",
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  notificationItem: {
    background: "white",
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },

  section: {
    marginTop: 20,
  },

  /* RESPONSIVE */
  "@media (max-width: 768px)": {
    sidebar: { display: "none" },
    mobileMenu: { display: "block", width: "100%" },

    statsGrid: {
      gridTemplateColumns: "1fr",
    },

    table: {
      overflowX: "auto",
      display: "block",
    },
  },
};
