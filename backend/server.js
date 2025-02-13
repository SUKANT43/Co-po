const express=require("express")
const app=express();


const cors=require('cors');
app.use(cors());


const connectDB=require("./config/db")
connectDB()

app.use(express.json());

const adminRoutes=require('./routes/adminRoutes')

app.use('/api/admin',adminRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
