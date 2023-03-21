import {Router} from "express";
import httpCode from "http-status-codes";

const {ServiceModel} = require("../models/service.model.js");
const router = Router();

router.get("/", (req, res) => {
    res.status(httpCode.OK).json({"Bienvenida": "Api NodeJs práctica 2 Grupo 3 ARQUI 2"})
});

// ENDPOINTS PARA ARDUINO
/**
 * Endpoint que obtiene el tiempo default configurado para el usuario activo
 */
router.get("/tiempo-default", (req, res) => {
    ServiceModel.create(req.app)
        .getDefaultTime().then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

/**
 * Enpoint para mandar ciclos de pomodoros ya sea de descanso o de actividad (guiarse de postman)
 */
router.post("/pomodoro", (req, res) => {
    ServiceModel.create(req.app)
        .newPomodoro(req.body.duracion, req.body.numero_ciclo, req.body.tipo)
        .then(data => {
            res.status(httpCode.OK).json(data)
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.post("/penalizacion", (req, res) => {
    ServiceModel.create(req.app)
        .penalty(req.body.tipo_penalizacion,req.body.tiempo,req.body.numero_ciclo)
        .then(data => {
            res.status(httpCode.OK).json(data)
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})


// ENDPOINTS PARA FRONT
router.get("/usuarios", (req, res) => {
    ServiceModel.create(req.app)
        .getUsers().then(data => {
        res.status(httpCode.OK).json(data);
    }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.post("/usuarios", (req, res) => {
    ServiceModel.create(req.app)
        .newUser(req.body.nombre, req.body.tiempo_pomodoro, req.body.tiempo_descanso)
        .then(data => {
            res.status(httpCode.OK).json(data)
        }).catch(err => {
        console.log(err);
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})

router.post("/activar-usuario/:id", (req, res) => {
    ServiceModel.create(req.app)
        .activateUser(req.params.id)
        .then(data => {
            if (data.cambio_usuario_activo) {
                res.status(httpCode.OK).json(data)
            } else {
                res.status(httpCode.NOT_FOUND).json(data)
            }
        }).catch(err => {
        console.log(err)
        res.status(httpCode.INTERNAL_SERVER_ERROR).json(err);
    })
})


module.exports = {router}