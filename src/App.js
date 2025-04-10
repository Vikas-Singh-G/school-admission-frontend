// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Sharma", email: "aarav@example.com", className: "10A" },
    { id: 2, name: "Isha Verma", email: "isha@example.com", className: "9B" },
    { id: 3, name: "Rahul Desai", email: "rahul@example.com", className: "11C" },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", className: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address 💌");
    } else {
      setEmailError("");
    }
  };

  const handleAddClick = () => {
    setFormData({ name: "", email: "", className: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.className || emailError) {
      alert("All fields must be filled properly, baby! 😘");
      return;
    }

    if (isEditing) {
      const updatedStudents = students.map((s) =>
        s.id === editId ? { ...s, ...formData } : s
      );
      setStudents(updatedStudents);
    } else {
      const newStudent = {
        id: students.length + 1,
        ...formData,
      };
      setStudents([...students, newStudent]);
    }

    setFormData({ name: "", email: "", className: "" });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
  };

  const handleEdit = (student) => {
    setFormData({ name: student.name, email: student.email, className: student.className });
    setEditId(student.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="top-bar">
        <h1>📘 Student Directory</h1>
        <div className="top-actions">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-btn" onClick={handleAddClick}>
            ➕ Add Student
          </button>
        </div>
      </div>

      {/* Student Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.className}</td>
              <td>
                <button onClick={() => handleEdit(student)} className="edit-btn">✏️ Edit</button>
                <button onClick={() => handleDelete(student.id)} className="delete-btn">❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "✏️ Update Student" : "➕ Add New Student"}</h2>
            <form onSubmit={handleSubmit} className="form-box">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                required
                className={emailError ? "error" : ""}
              />
              {emailError && <p className="error-text">{emailError}</p>}
              <input
                name="className"
                placeholder="Class"
                value={formData.className}
                onChange={handleChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  {isEditing ? "Update Student" : "Add Student"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
