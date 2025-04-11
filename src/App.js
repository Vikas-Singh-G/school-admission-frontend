// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent as deleteStudentAPI,
} from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({name: "",email: "",className: "",age: "",gender: ""});
  

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [emailError, setEmailError] = useState("");

  // 💡 Load students on component mount
  useEffect(() => {
    fetchStudents()
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students 😿", err));
  }, []);

  // 💫 Form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 💌 Email format validation
  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address 💌");
    } else {
      setEmailError("");
    }
  };

  // 🧼 Reset form fields
  const resetForm = () => {
    setFormData({ name: "", email: "", className: "", age: "", gender: "" });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
    setEmailError("");
  };
  

  // ➕ Add button click
  const handleAddClick = () => {
    resetForm();
    setShowModal(true);
  };

  // ✅ Add or Update student
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.className || emailError) {
      alert("All fields must be filled properly, baby! 😘");
      return;
    }

    const studentData = {
      name: formData.name,
      email: formData.email,
      className: formData.className,
      age: parseInt(formData.age),
      gender: formData.gender
    };
    
    
    
    

    if (isEditing) {
      updateStudent(editId, studentData)
        .then(() => {
          const updated = students.map((s) =>
            s.id === editId ? { id: editId, ...studentData } : s
          );
          setStudents(updated);
          resetForm();
        })
        .catch((err) => alert("Error updating student 😥"));
    } else {
      addStudent(studentData)
        .then((res) => {
          setStudents([...students, res.data]);
          resetForm();
        })
        .catch((err) => alert("Error adding student 😥"));
    }
    
  };

  // 🗑️ Delete student
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Really want to delete "${name}"? 🥺`);
  
    if (confirmed) {
      try {
        await deleteStudentAPI(id); // calls the API to delete
        // Refresh local state
        setStudents((prev) => prev.filter((s) => s.id !== id)); // updates UI immediately
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };
  

  // ✏️ Edit student
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      className: student.className,
      age: student.age,
     gender: student.gender
    });
    setEditId(student.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // 🔍 Search filter
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
                <button onClick={() => handleEdit(student)} className="edit-btn">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(student.id)} className="delete-btn">
                  ❌ Delete
                </button>
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
                name="age"
                placeholder="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

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
