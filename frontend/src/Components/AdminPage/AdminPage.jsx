import React, { useState } from "react";
import axios from "axios";
import "./admin.css";

// Define initial state for the form
const initialState = {
    department: "",
    year: 1,
    semester: 1,
    subject: "",
    courseCode: "",
    numberOfStudents: 0,
    copoId: "",
    stafName: "",
    stafEmail: "",
    stafId: "",
    ip1: 0,
    ip2: 0,
    pt1: [{ co1: 20, co2: 20, co3: 10 }], // Array of objects
    pt2: [{ co3: 10, co4: 20, co5: 20 }], // Array of objects
    endSemester: [{ co1: 20, co2: 20, co3: 20, co4: 20, co5: 20 }], // Array of objects
};
const AdminPage = () => {
    const [formData, setFormData] = useState(initialState);

    // Handle changes in top-level fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: isNaN(value) ? value : Number(value), // Convert to number if applicable
        }));
    };

    // Handle changes in nested fields (PT1, PT2, End Semester)
    const handleNestedChange = (e, section, field) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [section]: [{ ...prev[section][0], [field]: isNaN(value) ? value : Number(value) }],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:7007/api/admin/newData", formData);
            alert("Data submitted successfully!");
            setFormData({ ...initialState }); // Reset form
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Submission failed! Please check your inputs and try again.");
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                {/* Department */}
                <label>
                    Department:
                    <select name="department" value={formData.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                    </select>
                </label>

                {/* Year */}
                <label>
                    Year:
                    <select name="year" value={formData.year} onChange={handleChange}>
                        <option value="">Select Year</option>
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                    </select>
                </label>

                {/* Semester */}
                <label>
                    Semester:
                    <select name="semester" value={formData.semester} onChange={handleChange}>
                        <option value="">Select Semester</option>
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

                {/* Subject */}
                <label>
                    Subject:
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                </label>

                {/* Course Code */}
                <label>
                    Course Code:
                    <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} />
                </label>

                {/* Number of Students */}
                <label>
                    Number of Students:
                    <input
                        type="number"
                        name="numberOfStudents"
                        value={formData.numberOfStudents}
                        onChange={handleChange}
                        min="0"
                    />
                </label>

                {/* COPO ID */}
                <label>
                    COPO ID:
                    <input type="text" name="copoId" value={formData.copoId} onChange={handleChange} />
                </label>

                {/* Staff Name */}
                <label>
                    Staff Name:
                    <input type="text" name="stafName" value={formData.stafName} onChange={handleChange} />
                </label>

                {/* Staff Email */}
                <label>
                    Staff Email:
                    <input type="email" name="stafEmail" value={formData.stafEmail} onChange={handleChange} />
                </label>

                {/* Staff ID */}
                <label>
                    Staff ID:
                    <input type="text" name="stafId" value={formData.stafId} onChange={handleChange} />
                </label>

                {/* PT1 Maximum Marks */}
                <h3>PT1 Maximum Marks</h3>
                <label>
                    CO1:
                    <input
                        type="number"
                        name="co1"
                        value={formData.pt1.co1}
                        onChange={(e) => handleNestedChange(e, "pt1", "co1")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO2:
                    <input
                        type="number"
                        name="co2"
                        value={formData.pt1.co2}
                        onChange={(e) => handleNestedChange(e, "pt1", "co2")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO3:
                    <input
                        type="number"
                        name="co3"
                        value={formData.pt1.co3}
                        onChange={(e) => handleNestedChange(e, "pt1", "co3")}
                        min="0"
                        max="10"
                    />
                </label>

                {/* PT2 Maximum Marks */}
                <h3>PT2 Maximum Marks</h3>
                <label>
                    CO3:
                    <input
                        type="number"
                        name="co3"
                        value={formData.pt2.co3}
                        onChange={(e) => handleNestedChange(e, "pt2", "co3")}
                        min="0"
                        max="10"
                    />
                </label>
                <label>
                    CO4:
                    <input
                        type="number"
                        name="co4"
                        value={formData.pt2.co4}
                        onChange={(e) => handleNestedChange(e, "pt2", "co4")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO5:
                    <input
                        type="number"
                        name="co5"
                        value={formData.pt2.co5}
                        onChange={(e) => handleNestedChange(e, "pt2", "co5")}
                        min="0"
                        max="20"
                    />
                </label>

                {/* End Semester Maximum Marks */}
                <h3>End Semester Maximum Marks</h3>
                <label>
                    CO1:
                    <input
                        type="number"
                        name="co1"
                        value={formData.endSemester.co1}
                        onChange={(e) => handleNestedChange(e, "endSemester", "co1")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO2:
                    <input
                        type="number"
                        name="co2"
                        value={formData.endSemester.co2}
                        onChange={(e) => handleNestedChange(e, "endSemester", "co2")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO3:
                    <input
                        type="number"
                        name="co3"
                        value={formData.endSemester.co3}
                        onChange={(e) => handleNestedChange(e, "endSemester", "co3")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO4:
                    <input
                        type="number"
                        name="co4"
                        value={formData.endSemester.co4}
                        onChange={(e) => handleNestedChange(e, "endSemester", "co4")}
                        min="0"
                        max="20"
                    />
                </label>
                <label>
                    CO5:
                    <input
                        type="number"
                        name="co5"
                        value={formData.endSemester.co5}
                        onChange={(e) => handleNestedChange(e, "endSemester", "co5")}
                        min="0"
                        max="20"
                    />
                </label>

                {/* Internal Assessment Maximum Marks */}
                <h3>Internal Assessment Maximum Marks</h3>
                <label>
                    IP1:
                    <input
                        type="number"
                        name="ip1"
                        value={formData.ip1}
                        onChange={handleChange}
                        min="0"
                    />
                </label>
                <label>
                    IP2:
                    <input
                        type="number"
                        name="ip2"
                        value={formData.ip2}
                        onChange={handleChange}
                        min="0"
                    />
                </label>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AdminPage;