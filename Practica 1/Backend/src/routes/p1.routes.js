import {Router} from "express";
import httpCode from "http-status-codes";

const { P1Model } = require("../models/p1.model.js");
const router = Router();

router.get("/humedad",(req,res) => {
    P1Model.create(req.app)
        .getLogs('humedad').then(data => {
            res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/presion-barometrica",(req,res) => {
    P1Model.create(req.app)
        .getLogs('presion_barometrica').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/temperatura",(req,res) => {
    P1Model.create(req.app)
        .getLogs('temperatura').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/viento",(req,res) => {
    P1Model.create(req.app)
        .getLogs('viento').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/ultima-humedad",(req,res) => {
    P1Model.create(req.app)
        .getLast('humedad').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/ultima-presion-barometrica",(req,res) => {
    P1Model.create(req.app)
        .getLast('presion_barometrica').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/ultima-temperatura",(req,res) => {
    P1Model.create(req.app)
        .getLast('temperatura').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});

router.get("/ultimo-viento",(req,res) => {
    P1Model.create(req.app)
        .getLast('viento').then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(httpCode.INTERNAL_SERVER_ERROR);
    });
});




module.exports = {router}