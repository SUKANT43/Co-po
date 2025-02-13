const express=require("express")
const app=express();


const cors=require('cors');
app.use(cors());


const connectDB=require("./config/db")
connectDB()


const PORT = process.env.PORT || 7007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
