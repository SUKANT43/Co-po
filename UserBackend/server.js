const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/UserLogin");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.method)
    next()
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));

app.post("/api/userRegister", async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
});

app.post("/api/userChange-password", async (req, res) => {
    const { email, newPassword } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
});

const PORT = process.env.PORT || 7009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));