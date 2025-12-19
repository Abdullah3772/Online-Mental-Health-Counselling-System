import React from 'react';

const UserDashboard = () => {
  // Sample data - පසුව API එකකින් ලබාගත හැක
  const userData = {
    name: "HM ABDULLAH",
    studentId: "GWU/HICT/2022/39",
    role: "Patient",
    recentActivity: [
      { id: 1, task: "Profile Updated", date: "2023-10-25" },
      { id: 2, task: "Viewed Counseling Resources", date: "2023-10-24" }
    ]
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <h1>User Dashboard</h1>
      </header>

      <section style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>Welcome, {userData.name}!</h2>
        <p><strong>Student ID:</strong> {userData.studentId}</p>
        <p><strong>Account Type:</strong> {userData.role}</p>
      </section>

      <section>
        <h3>Recent Activity</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Activity</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {userData.recentActivity.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{item.task}</td>
                <td style={{ padding: '10px' }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer style={{ marginTop: '40px' }}>
        <button 
          onClick={() => alert('Redirecting to Profile...')}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Edit Profile
        </button>
      </footer>
    </div>
  );
};

export default UserDashboard;