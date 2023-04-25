const express = require("express");
const colors = require("colors");
const router = express.Router();

const client_mqtt = require("../protocol/mqtt.js");

router.post(process.env.API_BOMBA_ON, async (req, res) => {
  try {
    const topic = process.env.MQTT_DEVICE_CONFIG;
    const bomba = req.body.status_bomba;

    if (!bomba) {
      const response = {
        status: "Error",
      };
      return res.status(500).send(response);
    }

    const configBomba = {
      status_bomba: bomba,
      tiempo_activa_bomba: req.body.tiempo_activa_bomba,
    };

    const payload = JSON.stringify(configBomba);

    client_mqtt.publishMsg(topic, payload);

    const response = {
      status: "Success",
    };

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);

    const response = {
      status: "Error",
    };

    return res.status(404).send(response);
  }
});

router.post(process.env.API_BOMBA_OFF, async (req, res) => {
  try {
    const topic = process.env.MQTT_DEVICE_CONFIG;
    const bomba = req.body.status_bomba;

    if (bomba) {
      const response = {
        status: "Error",
      };
      return res.status(500).send(response);
    }

    const configBomba = {
      status_bomba: bomba,
      tiempo_activa_bomba: req.body.tiempo_activa_bomba,
    };

    const payload = JSON.stringify(configBomba);

    client_mqtt.publishMsg(topic, payload);

    const response = {
      status: "Success",
    };

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);

    const response = {
      status: "Error",
    };

    return res.status(404).send(response);
  }
});

module.exports = router;
