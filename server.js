const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');

const path = require("path")


require('dotenv').config(); //to store environment variables

const app = express();
const port = process.env.PORT || 5000; //create express server

app.use(cors());
app.use(express.json()); // parse json

app.use(express.static(path.join(__dirname, "client", "build")))


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const roomsRouter = require('./routes/rooms');

app.use('/rooms', roomsRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => { //starts server
    console.log('Server is running on port ${port}');
});