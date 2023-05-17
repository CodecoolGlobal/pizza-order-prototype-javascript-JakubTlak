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
	fs.writeFile(`${__dirname}/../backend/order.json`, JSON.stringify(order),(error)=>{
		if(error){
			console.error(error)
			res.status(500).send("i cuj")
		}else{
			res.status(200).send("git")
		}
	})
})


app.listen(3000,'127.0.0.1', () => console.log(`http://127.0.0.1:${3000}`)); 
