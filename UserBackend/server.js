const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method);
    next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));

// Use user routes
app.use(userRoutes);

const PORT = process.env.PORT || 7009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
