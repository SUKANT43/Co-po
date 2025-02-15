import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = {
  department: "CSE",
  year: 1,
  semester: 1,
  subject: "",
  courseCode: "",
  numberOfStudents: 1,
  copoId: "",
  stafName: "",
  stafEmail: "",
  stafId: "",
  ip1: 0,
  ip2: 0,
  pt1: [{ co1: 20, co2: 20, co3: 10 }],
  pt2: [{ co3: 10, co4: 20, co5: 20 }],
  endSemester: [{ co1: 20, co2: 20, co3: 20, co4: 20, co5: 20 }],
};

const AdminPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [logoColor, setLogoColor] = useState("#ffffff");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setLogoColor(scrollY > 100 ? "#d1d5db" : "#ffffff");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value),
    }));
  };

  // Validate required fields
  const validateForm = () => {
    const { department, subject, courseCode, copoId, stafName, stafEmail, stafId, numberOfStudents } = formData;

    if (!department || !subject || !courseCode || !copoId || !stafName || !stafEmail || !stafId) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    if (numberOfStudents < 1) {
      toast.error("Number of students must be at least 1.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(stafEmail)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:7007/api/admin/newData", formData);
      toast.success("Data submitted successfully!");
      setFormData({ ...initialState });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Submission failed! Please check your inputs and try again.");
    }
  };

  return (
    <motion.div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center admin-bg"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="card admin-card">
        <h1 className="text-center mb-4" style={{ color: logoColor }}>
          Admin Panel
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Department & Year */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="department" className="admin-label">
                Department:
              </label>
              <select
                name="department"
                id="department"
                className="form-select admin-input"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="year" className="admin-label">
                Year:
              </label>
              <select
                name="year"
                id="year"
                className="form-select admin-input"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            </div>
          </div>

          {/* Semester & Subject */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="semester" className="admin-label">
                Semester:
              </label>
              <select
                name="semester"
                id="semester"
                className="form-select admin-input"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value={1}>1st Sem</option>
                <option value={2}>2nd Sem</option>
                <option value={3}>3rd Sem</option>
                <option value={4}>4th Sem</option>
                <option value={5}>5th Sem</option>
                <option value={6}>6th Sem</option>
                <option value={7}>7th Sem</option>
                <option value={8}>8th Sem</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="subject" className="admin-label">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                className="form-control admin-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Course Code & Number of Students */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="courseCode" className="admin-label">
                Course Code:
              </label>
              <input
                type="text"
                name="courseCode"
                id="courseCode"
                className="form-control admin-input"
                value={formData.courseCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="numberOfStudents" className="admin-label">
                Number of Students:
              </label>
              <input
                type="number"
                name="numberOfStudents"
                id="numberOfStudents"
                className="form-control admin-input"
                value={formData.numberOfStudents}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          {/* COPO ID & Staff Name */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="copoId" className="admin-label">
                COPO ID:
              </label>
              <input
                type="text"
                name="copoId"
                id="copoId"
                className="form-control admin-input"
                value={formData.copoId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stafName" className="admin-label">
                Staff Name:
              </label>
              <input
                type="text"
                name="stafName"
                id="stafName"
                className="form-control admin-input"
                value={formData.stafName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Staff Email & Staff ID */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="stafEmail" className="admin-label">
                Staff Email:
              </label>
              <input
                type="email"
                name="stafEmail"
                id="stafEmail"
                className="form-control admin-input"
                value={formData.stafEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stafId" className="admin-label">
                Staff ID:
              </label>
              <input
                type="text"
                name="stafId"
                id="stafId"
                className="form-control admin-input"
                value={formData.stafId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 admin-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminPage;
