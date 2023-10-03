const express = require("express");
const fs = require("fs");
const app = express();
const apiRouter = require("./api.js");
const path = require("path");
const cors = require("cors")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/public", express.static(`${__dirname}/../frontend/public`))

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`));  
});

app.get("/order", (req,res)=>{
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.post("/order", (req,res)=>{
	let order = req.body;
	const orderArr=JSON.parse(fs.readFileSync(`order.json`));
	console.log(orderArr);
	orderArr.push(order);
	fs.writeFile(`order.json`, JSON.stringify(orderArr),(error)=>{
		if(error){
			console.error(error)
			res.status(500).send("Server Error")
		}else{
			res.status(200).send("Server Working")
		}
	})
})

app.get("/order/latestID",(req,res)=>{
	let orderArr=JSON.parse(fs.readFileSync(`order.json`));
	let latestID = orderArr[orderArr.length-1].id;
	let IDobj = {id:latestID};
	res.send(JSON.stringify(IDobj));
})


app.listen(3000,'127.0.0.1', () => console.log(`http://127.0.0.1:${3000}`)); 
