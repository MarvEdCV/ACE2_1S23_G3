import {Router} from "express";
import httpCode from "http-status-codes";

const { P1Model } = require("../models/p1.model.js");
const router = Router();

router.get("/humedad",(req,res) => {
    P1Model.create(req.app)
        .getLogsHumedad().then(data => {
            res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/presion-barometrica",(req,res) => {
    P1Model.create(req.app)
        .getLogsPresionBarometrica().then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/temperatura",(req,res) => {
    P1Model.create(req.app)
        .getLogsTemperatura().then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/viento",(req,res) => {
    P1Model.create(req.app)
        .getLogsViento().then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});


module.exports = {router}