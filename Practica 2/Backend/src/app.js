import express from "express";
import morgan from "morgan";
import config from "./config";
const mysql = require("mysql2")
const app = express();
const p1Routes = require('./routes/service.routes')

const cors = require("cors");
app.use(cors());

app.set("port",4010);

// Middlewares
app.use(morgan("dev"));

app.use("/api",p1Routes.router);

/**
 * Creamos pool conection para evitar crear muchas conexiones
 * @type {Pool}
 */
app.locals.mysqlConnectionPool = mysql.createPool(config.mysql);

export default  app;