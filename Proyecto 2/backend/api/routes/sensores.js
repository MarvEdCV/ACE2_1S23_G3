const express = require("express");
const colors = require("colors");
const router = express.Router();
const crypto = require("crypto");

const bd_mqtt = require("../database/dataMqtt.js");

router.post(process.env.API_SENSOR, async (req, res) => {
  var db_tabla = req.body.tabla;

  try {
    const data = await optenerData(db_tabla);

    console.log("Optiene Data ".green);
    console.log("=======================");

    if (data == "") {
      const response = {
        Status: "Fail",
      };

      return res.status(200).send(response);
    } else {
      return res.status(200).send(data);
    }
  } catch (error) {
    const response = {
      Status: "Fail",
    };

    // console.log(error);
    return res.status(500).send(response);
  }
});

optenerData = (tabla) => {
  return new Promise((resolve, reject) => {
    var elements = [];

    let query;

    if (tabla === process.env.DB_TH) {
      query = `
            ${process.env.DB_GET_SENSOR} ${process.env.DB_T1}
            UNION
            ${process.env.DB_GET_SENSOR}${process.env.DB_T2}
            UNION
            ${process.env.DB_GET_SENSOR}${process.env.DB_H1};
            `;
    } else query = `${process.env.DB_GET_SENSOR} ${tabla}`;

    if (query == "") return resolve(false);

    bd_mqtt.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      if (results.length > 0) {
        results.forEach((row) => {
          var msg = JSON.parse(JSON.stringify(row));
          elements.push(msg);
        });
        return resolve(elements);
      } else {
        console.log("No se encontraron elementos en la tabla".red);
        return resolve(false);
      }
    });
  });
};

module.exports = router;
