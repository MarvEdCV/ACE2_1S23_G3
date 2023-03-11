import {Router} from "express";
import httpCode from "http-status-codes";

const { P1Model } = require("../models/service.model.js");
const router = Router();

router.get("/",(req,res) => {
    res.status(httpCode.OK).json({"Bienvenida":"Api NodeJs práctica 2 Grupo 3 ARQUI 2"})
});

module.exports = {router}