import React, { useState } from "react";
import axios from "axios";
import "./admin.css";

const AdminPage = () => {
    const [formData, setFormData] = useState({
        department: "",
        year: "",
        subject: "",
        courseCode: "",
        numberOfStudents: "",
        copoId: "",
        stafName: "",
        stafEmail: "",
        stafId: "",
        ip1: "",
        ip2: "",
        pt1: { co1: "20", co2: "20", co3: "10" },
        pt2: { co3: "10", co4: "20", co5: "20" },
        endSemester: { co1: "20", co2: "20", co3: "20", co4: "20", co5: "20" },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNestedChange = (e, section, field) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:7007/api/admin/newData", formData);
            alert("Data submitted successfully!");
    
            // Reset form data
            setFormData({
                department: "",
                year: "",
                subject: "",
                courseCode: "",
                numberOfStudents: "",
                copoId: "",
                stafName: "",
                stafEmail: "",
                stafId: "",
                ip1: "",
                ip2: "",
                pt1: { co1: "20", co2: "20", co3: "10" },
                pt2: { co3: "10", co4: "20", co5: "20" },
                endSemester: { co1: "20", co2: "20", co3: "20", co4: "20", co5: "20" },
            });
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <label>Department: 
                    <select name="department" value={formData.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                    </select>
                </label>
              
                <label>Year: <input type="number" name="year" value={formData.year} onChange={handleChange} /></label>
                <label>Subject: <input type="text" name="subject" value={formData.subject} onChange={handleChange} /></label>
                <label>Course Code: <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} /></label>
                <label>Number of Students: <input type="number" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} /></label>
                <label>COPO ID: <input type="text" name="copoId" value={formData.copoId} onChange={handleChange} /></label>
                <label>Staff Name: <input type="text" name="stafName" value={formData.stafName} onChange={handleChange} /></label>
                <label>Staff Email: <input type="email" name="stafEmail" value={formData.stafEmail} onChange={handleChange} /></label>
                <label>Staff ID: <input type="text" name="stafId" value={formData.stafId} onChange={handleChange} /></label>

                <h3>PT1 Maximum Marks</h3>
                <label>CO1: <input type="number" value={formData.pt1.co1} readOnly /></label>
                <label>CO2: <input type="number" value={formData.pt1.co2} readOnly /></label>
                <label>CO3: <input type="number" value={formData.pt1.co3} readOnly /></label>

                <h3>PT2 Maximum Marks</h3>
                <label>CO3: <input type="number" value={formData.pt2.co3} readOnly /></label>
                <label>CO4: <input type="number" value={formData.pt2.co4} readOnly /></label>
                <label>CO5: <input type="number" value={formData.pt2.co5} readOnly /></label>

                <h3>End Semester Maximum Marks</h3>
                <label>CO1: <input type="number" value={formData.endSemester.co1} readOnly /></label>
                <label>CO2: <input type="number" value={formData.endSemester.co2} readOnly /></label>
                <label>CO3: <input type="number" value={formData.endSemester.co3} readOnly /></label>
                <label>CO4: <input type="number" value={formData.endSemester.co4} readOnly /></label>
                <label>CO5: <input type="number" value={formData.endSemester.co5} readOnly /></label>

                <h3>Internal Assessment Maximum Marks</h3>
                <label>IP1: <input type="number" name="ip1" value={formData.ip1} onChange={handleChange} /></label>
                <label>IP2: <input type="number" name="ip2" value={formData.ip2} onChange={handleChange} /></label>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};