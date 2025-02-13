const express=require("express")
const app=express();


const cors=require('cors');
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    next(); // Move to the next middleware or route
});


const connectDB=require("./config/db")
connectDB()


const adminRoutes=require('./routes/adminRoutes')

app.use('/api/admin',adminRoutes)

const PORT = process.env.PORT||7007
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
