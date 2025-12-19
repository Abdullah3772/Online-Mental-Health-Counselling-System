// src/components/User/UserDashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * UserDashboard with Dark Neon Left Sidebar (Purple Neon #a855f7)
 * Paste to: src/components/User/UserDashboard.jsx
 *
 * Requirements:
 *  - framer-motion installed (npm i framer-motion)
 *  - This is a UI-only component (dummy data). Hook up APIs as needed.
 */

const NEON = "#a855f7";

export default function UserDashboard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Dummy doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Lee",
      clinic: "City Clinic",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      nextDate: "2025-12-08",
      nextTime: "10:00",
    },
    {
      id: 2,
      name: "Dr. Nimal Perera",
      clinic: "Green Health",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      nextDate: "2025-12-08",
      nextTime: "14:00",
    },
    {
      id: 3,
      name: "Dr. Aisha Khan",
      clinic: "Sunrise Clinic",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      nextDate: "2025-12-09",
      nextTime: "11:30",
    },
  ];

  // Dummy reminders (kept in state for demonstration)
  const [reminders, setReminders] = useState([
    { clinic: "City Clinic", date: "2025-12-08", time: "10:00" },
    { clinic: "Green Health", date: "2025-12-08", time: "14:00" },
  ]);

  // Booking modal
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState({
    doctorId: "",
    doctorName: "",
    clinic: "",
    date: "",
    time: "",
    reason: "",
    patientName: "",
    phone: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { who: "doc", text: "Hello! I'm available if you need help.", time: now.toLocaleTimeString() },
  ]);
  const [chatText, setChatText] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  // Open modal prefilled
  function openBookingFor(doc) {
    setBooking({
      doctorId: doc.id,
      doctorName: doc.name,
      clinic: doc.clinic,
      date: doc.nextDate,
      time: doc.nextTime,
      reason: "",
      patientName: "",
      phone: "",
    });
    setBookingOpen(true);
  }

  function confirmBooking() {
    if (!booking.patientName || !booking.phone || !booking.date || !booking.time) {
      alert("Please fill patient name, phone, date and time.");
      return;
    }

    setBookingSuccess(true);

    // simulate network/processing
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingOpen(false);

      // prepend new reminder immutably
      setReminders((r) => [{ clinic: booking.clinic || booking.doctorName, date: booking.date, time: booking.time }, ...r]);

      // show quick chat/timeline notification
      setMessages((m) => [
        ...m,
        { who: "me", text: `Booked with ${booking.doctorName || booking.clinic} on ${booking.date} ${booking.time}`, time: new Date().toLocaleTimeString() },
      ]);

      // clear booking form
      setBooking({
        doctorId: "",
        doctorName: "",
        clinic: "",
        date: "",
        time: "",
        reason: "",
        patientName: "",
        phone: "",
      });
    }, 1100);
  }

  // Chat send (dummy)
  function sendChat() {
    if (!chatText.trim()) return;
    const userMsg = { who: "me", text: chatText.trim(), time: new Date().toLocaleTimeString() };
    setMessages((m) => [...m, userMsg]);
    setChatText("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { who: "doc", text: "Thanks — I received your message. I'll review and get back shortly.", time: new Date().toLocaleTimeString() },
      ]);
    }, 800 + Math.random() * 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Poppins, system-ui, Arial",
        background: "linear-gradient(180deg,#120617 0%, #b319b0ff 40%)",
        color: "#fff",
      }}
    >
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.75); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .success-check {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6));
          display:flex; align-items:center; justify-content:center; margin:auto;
          box-shadow:0 10px 40px rgba(168,85,247,0.18);
          animation: popIn 0.6s ease;
          font-weight: 900;
          color: #050007;
          font-size: 28px;
        }
        /* Scrollbar for chat */
        .chat-scroll::-webkit-scrollbar { width: 8px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 8px; }
      `}</style>

      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: 240,
          minWidth: 200,
          background: "linear-gradient(180deg, rgba(149, 54, 127, 0.95), rgba(12,6,20,0.92))",
          borderRight: `1px solid rgba(39, 26, 37, 0.08)`,
          padding: 18,
          boxShadow: `0 10px 40px rgba(184, 57, 184, 0.03)`,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              overflow: "hidden",
              border: `3px solid ${NEON}`,
              boxShadow: `0 6px 24px ${NEON}22`,
            }}
          >
            <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="You" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontWeight: 800 }}>User</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>user@example.com</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
          <SidebarItem label="Dashboard" icon="🏠" active />
          <SidebarItem label="Appointments" icon="📅" />
          <SidebarItem label="Messages" icon="✉️" />
          <SidebarItem label="Profile" icon="👤" />
          <SidebarItem label="Settings" icon="⚙️" />
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))`,
              color: "#040004",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: `0 8px 30px ${NEON}22`,
            }}
            onClick={() => {
              // placeholder action
              setBookingOpen(true);
              setBooking({
                doctorId: "",
                doctorName: "",
                clinic: "",
                date: "",
                time: "",
                reason: "",
                patientName: "",
                phone: "",
              });
            }}
          >
            New Quick Booking
          </button>
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
            App build: <strong>v1.0.0</strong>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT (shifted right to leave sidebar) */}
      <main style={{ marginLeft: 240, padding: "28px 32px", width: "100%" }}>
        <motion.h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, textShadow: `0 6px 16px rgba(0,0,0,0.6)` }}>
          Welcome — your dashboard
        </motion.h2>

        {/* QUICK ROW */}
        <div style={{ maxWidth: 1100, marginTop: 18, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div
            style={{
              flex: "1 1 420px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              padding: 14,
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 700 }}>Current Date & Time</div>
            <div style={{ marginTop: 6, fontSize: 16, fontWeight: 800 }}>
              {now.toLocaleDateString()} — {now.toLocaleTimeString()}
            </div>
          </div>

          <div style={{ width: 220, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                setBookingOpen(true);
                setBooking({ doctorId: "", doctorName: "", clinic: "", date: "", time: "", reason: "", patientName: "", phone: "" });
              }}
              style={{
                background: `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))`,
                color: "#070005ff",
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: `0 10px 30px ${NEON}22`,
              }}
            >
              New Quick Booking
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div style={{ maxWidth: 1100, marginTop: 20, display: "grid", gridTemplateColumns: "1fr 340px", gap: 18 }}>
          {/* Left column (doctors + reminders) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Doctors */}
            <section style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 800 }}>Doctors Available</div>
                <div style={{ opacity: 0.85 }}>{doctors.length} doctors</div>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {doctors.map((d) => (
                  <motion.div
                    key={d.id}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 10,
                      borderRadius: 10,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))",
                      border: `1px solid rgba(168,85,247,0.03)`,
                    }}
                  >
                    <img src={d.photo} alt={d.name} style={{ width: 64, height: 64, borderRadius: 999, objectFit: "cover", border: `3px solid ${NEON}` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800 }}>{d.name}</div>
                      <div style={{ fontSize: 13, opacity: 0.9 }}>{d.clinic}</div>
                      <div style={{ marginTop: 6, fontSize: 13, color: "#e9e9ff" }}>
                        Next: {d.nextDate} @ {d.nextTime}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button
                        onClick={() => openBookingFor(d)}
                        style={{
                          background: `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))`,
                          color: "#050007",
                          fontWeight: 800,
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: 10,
                          cursor: "pointer",
                        }}
                      >
                        Book
                      </button>
                      <button
                        onClick={() => {
                          setChatOpen(true);
                          setMessages((m) => [...m, { who: "me", text: `Hi ${d.name}, I want to consult.`, time: new Date().toLocaleTimeString() }]);
                        }}
                        style={{
                          background: "transparent",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.04)",
                          padding: "6px 10px",
                          borderRadius: 10,
                          cursor: "pointer",
                        }}
                      >
                        Chat
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Reminders */}
            <section style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Upcoming Clinic Reminders</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: "#eaeaff" }}>
                    <th style={{ padding: "8px 6px 6px 0" }}>Clinic</th>
                    <th style={{ padding: "8px 6px" }}>Date</th>
                    <th style={{ padding: "8px 6px" }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.02)" }}>
                      <td style={{ padding: "8px 6px 10px 0" }}>{r.clinic}</td>
                      <td style={{ padding: "8px 6px" }}>{r.date}</td>
                      <td style={{ padding: "8px 6px" }}>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* Right column (overview + mini chat preview) */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontWeight: 800 }}>Quick Overview</div>
              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ background: "rgba(255,255,255,0.01)", padding: 10, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>Next Appointment</div>
                  <div style={{ fontWeight: 800, marginTop: 6 }}>{doctors[0].nextDate} — {doctors[0].nextTime}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{doctors[0].clinic}</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.01)", padding: 10, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>Notifications</div>
                  <div style={{ fontWeight: 800, marginTop: 6 }}>{reminders.length} Reminders</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>Check reminders</div>
                </div>
              </div>
            </div>

            <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 800 }}>Live Chat</div>
                <button onClick={() => setChatOpen((s) => !s)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "#fff", padding: "6px 10px", borderRadius: 8 }}>
                  Open
                </button>
              </div>

              <div style={{ maxHeight: 180, overflow: "auto", padding: 6, borderRadius: 8, background: "rgba(0,0,0,0.12)" }}>
                {messages.slice(-5).map((m, i) => (
                  <div key={i} style={{ marginBottom: 8, display: "flex", flexDirection: m.who === "me" ? "row-reverse" : "row", gap: 8 }}>
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "8px 10px",
                        borderRadius: 10,
                        background: m.who === "me" ? `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))` : "rgba(255,255,255,0.04)",
                        color: m.who === "me" ? "#050007" : "#fff",
                      }}
                    >
                      <div style={{ fontSize: 13 }}>{m.text}</div>
                      <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Chat Button (bottom-right) */}
      <motion.div
        onClick={() => setChatOpen(true)}
        whileHover={{ scale: 1.06 }}
        style={{
          position: "fixed",
          right: 22,
          bottom: 22,
          width: 62,
          height: 62,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))`,
          boxShadow: `0 10px 30px ${NEON}22`,
          cursor: "pointer",
          color: "#050007",
          fontSize: 22,
          zIndex: 50,
        }}
      >
        💬
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                width: "min(820px, 96%)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                padding: 18,
                borderRadius: 12,
                backdropFilter: "blur(12px)",
                color: "#fff",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>Book Appointment</div>
                <button onClick={() => setBookingOpen(false)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>
                  ✕
                </button>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 140px" }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>Doctor</div>
                  <input value={booking.doctorName} readOnly style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", marginTop: 6, background: "rgba(0,0,0,0.12)", color: "#fff" }} />
                </div>

                <div style={{ flex: "1 1 220px" }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>Clinic</div>
                  <input value={booking.clinic} readOnly style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", marginTop: 6, background: "rgba(0,0,0,0.12)", color: "#fff" }} />
                </div>

                <div style={{ flex: "0 0 150px" }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>Date</div>
                  <input type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", marginTop: 6 }} />
                </div>

                <div style={{ flex: "0 0 120px" }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>Time</div>
                  <input type="time" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })} style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", marginTop: 6 }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                <input
                  placeholder="Patient name"
                  value={booking.patientName}
                  onChange={(e) => setBooking({ ...booking, patientName: e.target.value })}
                  style={{ padding: 10, borderRadius: 10, border: "none", background: "rgba(0,0,0,0.12)", color: "#fff" }}
                />
                <input
                  placeholder="Phone number"
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                  style={{ padding: 10, borderRadius: 10, border: "none", background: "rgba(0,0,0,0.12)", color: "#fff" }}
                />
              </div>

              <div style={{ marginTop: 12 }}>
                <textarea
                  placeholder="Reason for visit"
                  rows={3}
                  value={booking.reason}
                  onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
                  style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", minHeight: 84 }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 12, alignItems: "center" }}>
                <button onClick={confirmBooking} style={{ background: `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))`, border: "none", padding: "10px 16px", borderRadius: 10, fontWeight: 900, cursor: "pointer" }}>
                  Confirm Booking
                </button>
                <button onClick={() => setBookingOpen(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", padding: "10px 12px", borderRadius: 10, cursor: "pointer" }}>
                  Cancel
                </button>

                <div style={{ flex: 1 }}>
                  <AnimatePresence>
                    {bookingSuccess && (
                      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="success-check">✓</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel (slide-in) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: 380 }}
            animate={{ x: 0 }}
            exit={{ x: 380 }}
            transition={{ duration: 0.28 }}
            style={{
              position: "fixed",
              right: 22,
              bottom: 22,
              width: 380,
              height: "72vh",
              maxHeight: 760,
              background: "linear-gradient(180deg, rgba(53, 41, 41, 0.02), rgba(255,255,255,0.01))",
              borderRadius: 12,
              overflow: "hidden",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: 12, background: `linear-gradient(90deg, rgba(0,0,0,0.25), rgba(0,0,0,0.18))`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 800 }}>Live Chat — Doctor</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setChatOpen(false); }} style={{ background: "transparent", color: "#100a0aff", border: "none", fontSize: 16 }}>
                  ✕
                </button>
              </div>
            </div>

            <div ref={chatBodyRef} className="chat-scroll" style={{ padding: 12, flex: 1, overflowY: "auto", background: "rgba(0,0,0,0.06)" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.who === "me" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "8px 12px",
                      borderRadius: 12,
                      background: m.who === "me" ? `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))` : "rgba(255,255,255,0.04)",
                      color: m.who === "me" ? "#050007" : "#000000ff",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.24)",
                    }}
                  >
                    <div style={{ fontSize: 14 }}>{m.text}</div>
                    <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.03)", background: "rgba(0,0,0,0.06)", display: "flex", gap: 8 }}>
              <input value={chatText} onChange={(e) => setChatText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Type a message..." style={{ flex: 1, padding: 10, borderRadius: 10, border: "none" }} />
              <button onClick={sendChat} style={{ background: `linear-gradient(90deg, ${NEON}, rgba(168,85,247,0.6))`, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 }}>
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* Sidebar item small component */
function SidebarItem({ label, icon, active }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        background: active ? "linear-gradient(90deg, rgba(168,85,247,0.08), rgba(168,85,247,0.04))" : "transparent",
        border: active ? `1px solid rgba(168,85,247,0.14)` : "1px solid transparent",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          background: active ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.02)",
          fontWeight: 800,
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 700 }}>{label}</div>
    </div>
  );
}
