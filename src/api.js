import axios from "axios";

// const API_BASE =" http://localhost:8080";
// export const fetchStudents = () => axios.get(`${API_BASE}/students`);
// export const getStudent = (id) => axios.get(`${API_BASE}/students/${id}`);
// export const addStudent = (data) => axios.post(`${API_BASE}/students`, data);
// export const updateStudent = (id, data) => axios.put(`${API_BASE}/students/${id}`, data);
// export const deleteStudent = (id) => axios.delete(`${API_BASE}/students/${id}`);
// export const searchStudents = (query) => axios.get(`${API_BASE}/students/search`, { params: { query } });


const API = axios.create({baseURL: "http://localhost:8080",});

export const fetchStudents = () => API.get("/students");
export const getStudent = (id) => API.get(`/students/${id}`);
export const addStudent = (data) => API.post("/students", data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
export const searchStudents = (query) => API.get("/students/search", { params: { query } });
