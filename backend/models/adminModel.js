const mongoose = require("mongoose");


const pt1Schema = new mongoose.Schema({
    co1: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO1"] },
    co2: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO2"] },
    co3: { type: Number, min: 0, max: 10, required: [true, "Enter a value for CO3"] }
});

const pt2Schema = new mongoose.Schema({
    co3: { type: Number, min: 0, max: 10, required: [true, "Enter a value for CO3"] },
    co4: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO4"] },
    co5: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO5"] }
});

const endSemesterSchema = new mongoose.Schema({
    co1: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO1"] },
    co2: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO2"] },
    co3: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO3"] },
    co4: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO4"] },
    co5: { type: Number, min: 0, max: 20, required: [true, "Enter a value for CO5"] }
});

const adminSchema = new mongoose.Schema(
    {
        department: { type: String, required: true }, // Must be non-empty
        year: { type: Number, required: true, min: 1, max: 4 }, // Must be between 1 and 4
        semester: { type: Number, required: true, min: 1, max: 8 }, // Must be between 1 and 8
        subject: { type: String, required: true }, // Must be non-empty
        courseCode: { type: String, required: true }, // Must be non-empty
        numberOfStudents: { type: Number, required: true, min: 1 }, // Must be at least 1
        copoId: { type: String, required: true }, // Must be non-empty
        stafName: { type: String, required: true }, // Must be non-empty
        stafEmail: { type: String, required: true }, // Must be non-empty
        stafId: { type: String, required: true, unique: true }, // Must be non-empty and unique
        ip1: { type: Number, required: true, min: 0 }, // Must be non-negative
        ip2: { type: Number, required: true, min: 0 }, // Must be non-negative
        pt1: [pt1Schema], // Must be an array of objects
        pt2: [pt2Schema], // Must be an array of objects
        endSemester: [endSemesterSchema], // Must be an array of objects
    },
    { timestamps: true }
);


module.exports = mongoose.model("Admin", adminSchema);
