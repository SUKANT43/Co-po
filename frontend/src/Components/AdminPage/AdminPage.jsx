import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./admin.css";

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
    const [logoColor, setLogoColor] = useState("black");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setLogoColor(scrollY > 100 ? "darkgray" : "black");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: isNaN(value) ? value : Number(value),
        }));
    };

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
            className="admin-container"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 70 }}
        >
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            
            <h1 style={{ color: logoColor }}>Admin Panel</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <label>
                    Department:
                    <select name="department" value={formData.department} onChange={handleChange} required>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                    </select>
                </label>

                <label>
                    Year:
                    <select name="year" value={formData.year} onChange={handleChange} required>
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                    </select>
                </label>

                <label>
                    Semester:
                    <select name="semester" value={formData.semester} onChange={handleChange} required>
                        <option value={1}>1st Sem</option>
                        <option value={2}>2nd Sem</option>
                        <option value={3}>3rd Sem</option>
                        <option value={4}>4th Sem</option>
                        <option value={5}>5th Sem</option>
                        <option value={6}>6th Sem</option>
                        <option value={7}>7th Sem</option>
                        <option value={8}>8th Sem</option>
                    </select>
                </label>

                <label>
                    Subject:
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                </label>

                <label>
                    Course Code:
                    <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required />
                </label>

                <label>
                    Number of Students:
                    <input
                        type="number"
                        name="numberOfStudents"
                        value={formData.numberOfStudents}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </label>

                <label>
                    COPO ID:
                    <input type="text" name="copoId" value={formData.copoId} onChange={handleChange} required />
                </label>

                <label>
                    Staff Name:
                    <input type="text" name="stafName" value={formData.stafName} onChange={handleChange} required />
                </label>

                <label>
                    Staff Email:
                    <input type="email" name="stafEmail" value={formData.stafEmail} onChange={handleChange} required />
                </label>

                <label>
                    Staff ID:
                    <input type="text" name="stafId" value={formData.stafId} onChange={handleChange} required />
                </label>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </motion.div>
    );
};

export default AdminPage;
