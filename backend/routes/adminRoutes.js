const express = require("express");
const router = express.Router();

const {newData,getAllData,getCertainDat,updateData,deleteData}=require('../controllers/adminController')

router.post("/newData",newData );

router.get("/getAllData",getAllData );

router.get("/getCertainData/:id", getCertainDat);

router.put("/updateData/:id",updateData );

router.delete("/deleteData/:id", deleteData);

module.exports = router;
