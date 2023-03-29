import express from "express";
import morgan from "morgan";
import config from "./config";
const mysql = require("mysql2")
const app = express();
const p1Routes = require('./routes/service.routes')
const bodyParser = require('body-parser');

const cors = require("cors");

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, authorization',
    );
    next();
});

app.set("port",4010);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api",p1Routes.router);

/**
 * Creamos pool conection para evitar crear muchas conexiones
 * @type {Pool}
 */
app.locals.mysqlConnectionPool = mysql.createPool(config.mysql);

export default  app;