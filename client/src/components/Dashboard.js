import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
    assignedTo: ""
  });
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");

  // Fetch bugs
  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bugs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBugs(res.data);
    } catch (err) {
      console.error("Failed to fetch bugs:", err);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  // Create a new bug
  const handleCreateBug = async () => {
    try {
      await axios.post("http://localhost:5000/api/bugs", newBug, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBug({ title: "", description: "", status: "open", priority: "medium", assignedTo: "" });
      fetchBugs(); // refresh
    } catch (err) {
      console.error("Failed to create bug:", err);
    }
  };

  // Filtered bugs
  const filteredBugs = filter === "all" ? bugs : bugs.filter(b => b.status === filter);

  return (
    <div className="dashboard-container">
      <h2>🐞 Bug Tracker Dashboard</h2>

      {/* New Bug Form */}
      <div className="form-card">
        <h3>➕ Report a New Bug</h3>
        <input placeholder="Title" value={newBug.title} onChange={(e) => setNewBug({ ...newBug, title: e.target.value })} />
        <input placeholder="Description" value={newBug.description} onChange={(e) => setNewBug({ ...newBug, description: e.target.value })} />
        <input placeholder="Assigned To" value={newBug.assignedTo} onChange={(e) => setNewBug({ ...newBug, assignedTo: e.target.value })} />
        <select onChange={(e) => setNewBug({ ...newBug, status: e.target.value })} value={newBug.status}>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <select onChange={(e) => setNewBug({ ...newBug, priority: e.target.value })} value={newBug.priority}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleCreateBug}>Create Bug</button>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <label>Filter by status:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Bug Table */}
      <div className="bug-list">
        {filteredBugs.length === 0 ? (
          <p>No bugs to show.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {filteredBugs.map(bug => (
                <tr key={bug._id}>
                  <td>{bug.title}</td>
                  <td>{bug.status}</td>
                  <td>{bug.priority}</td>
                  <td>{bug.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
