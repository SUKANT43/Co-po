const Admin =require('../models/adminModel')

const newData=async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const getAllData=async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCertainDat=async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateData=async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteData=async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={newData,getAllData,getCertainDat,updateData,deleteData}