require("dotenv").config(); 

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI); // Debugging line
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
