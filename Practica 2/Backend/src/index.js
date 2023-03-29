import app from "./app";
const { P1Model } = require("./models/service.model");
const SerialPort = require("serialport").SerialPort;
const { DelimiterParser } = require("@serialport/parser-delimiter");

const main = ()=>{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")} root -> http://localhost:${app.get("port")}/api/`);
};
main();