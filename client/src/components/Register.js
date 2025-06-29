import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "developer",
  });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("User registered!");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>👤 Register</h2>
        <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })} value={form.role}>
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
