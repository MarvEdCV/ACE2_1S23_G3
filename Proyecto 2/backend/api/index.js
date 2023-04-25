var express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");

var app = express();

require("dotenv").config({ path: "../.env" });

console.log("======================================".red);

const client_mqtt = require("./protocol/mqtt.js");

client_mqtt.recibeMsg();

var port = process.env.API_PORT;
var host = process.env.API_HOST_LOCAL;

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express routes
app.use("/api/v1/", require("./routes/sensores.js"));
app.use("/api/v1/", require("./routes/graficas.js"));
app.use("/api/v1/", require("./routes/app.js"));

app.listen(port, host, function () {
  console.log("Server ok".green);
  console.log(`http://${host}:${port}`.green);
});

module.exports = app;