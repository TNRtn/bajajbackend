const express=require('express');
const app=express();
const mg=require('mongoose');
let url=require('./urls');
const cors=require('cors');
const port=5000;
mg.connect(url,{dbName:"bajaj"}).then(()=>{
	console.log("connection success...");
},
(errres)=>{
	console.log("connection failed",errres);
})
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
	return res.send("tnr srm");
})
const routes=require("./router.js")
app.use('/',routes);

app.listen(port,()=>{
	console.log("server running......");
})