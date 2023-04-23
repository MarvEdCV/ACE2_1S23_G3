const express = require("express");
const colors = require("colors");
const router = express.Router();
const crypto = require("crypto");

const bd_mqtt = require("../database/dataMqtt.js");

router.post(process.env.API_SENSOR_TEMP1, async (req, res) => {

  const fecha_inicio = req.body.fechainicial;
  const fecha_fin = req.body.fechafinal;
  const dbase = process.env.DB_T1;

  try {
    const data = await dataTime(dbase, fecha_inicio, fecha_fin);

    if (data.length > 0) {
      return res.status(200).send(data);
    } else {
      const response = {
        status: "Fail",
      };
      return res.status(404).send(response);
    }
  } catch (error) {
    console.error(error);
    const response = {
      status: "Error",
    };
    return res.status(500).send(response);
  }
});

router.post(process.env.API_SENSOR_TEMP2, async (req, res) => {

  const fecha_inicio = req.body.fechainicial;
  const fecha_fin = req.body.fechafinal;
  const dbase = process.env.DB_T2;

  try {
    const data = await dataTime(dbase, fecha_inicio, fecha_fin);

    if (data.length > 0) {
      return res.status(200).send(data);
    } else {
      const response = {
        status: "Fail",
      };
      return res.status(404).send(response);
    }
  } catch (error) {
    console.error(error);
    const response = {
      status: "Error",
    };
    return res.status(500).send(response);
  }
});

  router.post(process.env.API_SENSOR_HUM1, async (req, res) => {

    const fecha_inicio = req.body.fechainicial;
    const fecha_fin = req.body.fechafinal;
    const dbase = process.env.DB_H1;
  
    try {
      const data = await dataTime(dbase, fecha_inicio, fecha_fin);
  
      if (data.length > 0) {
        return res.status(200).send(data);
      } else {
        const response = {
          status: "Fail",
        };
        return res.status(404).send(response);
      }
    } catch (error) {
      console.error(error);
      const response = {
        status: "Error",
      };
      return res.status(500).send(response);
    }
  });  

  router.post(process.env.API_SENSOR_DIST1, async (req, res) => {

    const fecha_inicio = req.body.fechainicial;
    const fecha_fin = req.body.fechafinal;
    const dbase = process.env.DB_D1;
  
    try {
      const data = await dataTime(dbase, fecha_inicio, fecha_fin);
  
      if (data.length > 0) {
        return res.status(200).send(data);
      } else {
        const response = {
          status: "Fail",
        };
        return res.status(404).send(response);
      }
    } catch (error) {
      console.error(error);
      const response = {
        status: "Error",
      };
      return res.status(500).send(response);
    }
  });  

dataTime = (dbase, fecha_inicio, fecha_fin) => {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM ${dbase}
      WHERE created BETWEEN 
          DATE_FORMAT('${fecha_inicio}', '%Y-%m-%d %H:%i:%s') 
          AND 
          DATE_FORMAT('${fecha_fin}', '%Y-%m-%d %H:%i:%s') 
      ORDER BY created;`;

    bd_mqtt.query(query, [fecha_inicio, fecha_fin], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const elements = results.map((row) => {
          return JSON.parse(JSON.stringify(row));
        });
        resolve(elements);
      }
    });
  });
};

module.exports = router;
