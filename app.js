const express = require("express");
let app = express()
const Http = require("http").Server(app);
const io = require("socket.io")(Http, {
    cors: {
        origin: "*"
    }
});

const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const lightcontrol = require("./namespaces/lightcontrol")(io);


Http.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
})