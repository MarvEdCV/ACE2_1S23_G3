import express from "express";
import morgan from "morgan";
import config from "./config";
const mysql = require("mysql")
const app = express();

app.set("port",4010);

// Middlewares
app.use(morgan("dev"));

/**
 * Creamos pool conection para evitar crear muchas conexiones
 * @type {Pool}
 */
app.locals.mysqlConnectionPool = mysql.createPool(config.mysql);

export default  app;