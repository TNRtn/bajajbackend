const express=require("express");
const router=express.Router();
const uapi=require("./apis/userapis");
router.post("/bfhl",uapi.unew);
router.get("/bfhl",uapi.getAllUsers);
module.exports=router;