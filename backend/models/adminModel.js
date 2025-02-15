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
        department: { type: String, required: [true, "Enter a department"] },
        year: { type: Number, required: [true, "Enter a year"] },
        Semester:{type:Number,required:[true, "Enter a year"] },
        subject: { type: String, required: [true, "Enter a subject"] },
        courseCode: { type: String, required: [true, "Enter a course code"] },
        numberOfStudents: { type: Number, required: [true, "Enter number of students"] },
        copoId: { type: String, required: [true, "Enter a COPO ID"],  },
        stafName:{type: String, required: [true, "Enter a COPO ID"], },
        stafEmail:{type: String, required: [true, "Enter a COPO ID"], },
        staffId:{type:String ,required: [true, "Enter a COPO ID"],unique:true},
        pt1: [pt1Schema], 
        ip1: { type: Number, required: [true, "Enter IP1 value"] },
        pt2: [pt2Schema], 
        ip2: { type: Number,  required: [true, "Enter IP2 value"] },
        endSemester: [endSemesterSchema] 

    },
    { timestamps: true }
);


module.exports = mongoose.model("Admin", adminSchema);
