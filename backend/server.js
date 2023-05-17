const express = require("express");
const fs = require("fs");
const app = express();
const apiRouter = require("./api.js");
const path = require("path");
const cors = require("cors")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`));  
});

app.get("/script.js", (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/script.js`));  
});

app.use("/api", apiRouter);

app.listen(3000, () => console.log(`http://127.0.0.1:${3000}`)); 
