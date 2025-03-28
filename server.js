const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config()
const compression = require('compression');

const routes =require("./routes/product");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(compression());
app.use(express.json());
app.use(cors())

mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.use("/api",routes);


app.listen(PORT, ()=>console.log(`Server in running at ${PORT}`));