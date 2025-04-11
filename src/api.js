import axios from "axios";

const API_BASE =" http://localhost:8080";
export const fetchStudents = () => axios.get(`${API_BASE}/students`);
export const getStudent = (id) => axios.get(`${API_BASE}/students/${id}`);
export const addStudent = (data) => axios.post(`${API_BASE}/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_BASE}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_BASE}/students/${id}`);
export const searchStudents = (query) => axios.get(`${API_BASE}/students/search`, { params: { query } });