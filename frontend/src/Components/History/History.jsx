import React, { useEffect, useState } from "react";
import axios from "axios";
function History() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: "",
    department: "",
    year: "",
    semester: "",
    subject: "",
    courseCode: "",
    numberOfStudents: "",
    copoId: "",
    stafName: "",
    stafEmail: "",
    stafId: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all data on component load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:7007/api/admin/getAllData");
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:7007/api/admin/deleteData/${id}`);
        alert("Record deleted successfully!");
        fetchData();
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditForm(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:7007/api/admin/updateData/${editForm._id}`,
        editForm
      );
      alert("Record updated successfully!");
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter data by copoId
    if (value.trim() === "") {
      setFilteredData(data); // If search is empty, show all data
    } else {
      const filtered = data.filter((item) =>
        item.copoId.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <h2>History</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by CO-PO ID"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Department</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Subject</th>
            <th>Course Code</th>
            <th>No. of Students</th>
            <th>CO-PO ID</th>
            <th>Staff Name</th>
            <th>Staff Email</th>
            <th>Staff ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.department}</td>
              <td>{item.year}</td>
              <td>{item.semester}</td>
              <td>{item.subject}</td>
              <td>{item.courseCode}</td>
              <td>{item.numberOfStudents}</td>
              <td>{item.copoId}</td>
              <td>{item.stafName}</td>
              <td>{item.stafEmail}</td>
              <td>{item.stafId}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Record</h3>
          <input
            type="text"
            name="department"
            value={editForm.department}
            onChange={handleInputChange}
            placeholder="Department"
          />
          <input
            type="number"
            name="year"
            value={editForm.year}
            onChange={handleInputChange}
            placeholder="Year"
          />
          <input
            type="number"
            name="semester"
            value={editForm.semester}
            onChange={handleInputChange}
            placeholder="Semester"
          />
          <input
            type="text"
            name="subject"
            value={editForm.subject}
            onChange={handleInputChange}
            placeholder="Subject"
          />
          <input
            type="text"
            name="courseCode"
            value={editForm.courseCode}
            onChange={handleInputChange}
            placeholder="Course Code"
          />
          <input
            type="number"
            name="numberOfStudents"
            value={editForm.numberOfStudents}
            onChange={handleInputChange}
            placeholder="No. of Students"
          />
          <input
            type="text"
            name="copoId"
            value={editForm.copoId}
            onChange={handleInputChange}
            placeholder="CO-PO ID"
          />
          <input
            type="text"
            name="stafName"
            value={editForm.stafName}
            onChange={handleInputChange}
            placeholder="Staff Name"
          />
          <input
            type="email"
            name="stafEmail"
            value={editForm.stafEmail}
            onChange={handleInputChange}
            placeholder="Staff Email"
          />
          <input
            type="text"
            name="stafId"
            value={editForm.stafId}
            onChange={handleInputChange}
            placeholder="Staff ID"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default History;
