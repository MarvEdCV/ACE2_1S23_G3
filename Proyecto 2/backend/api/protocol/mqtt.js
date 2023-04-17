const mqtt = require("mqtt");
const colors = require("colors");

const bd_mqtt = require("../database/dataMqtt.js");

const host = process.env.MQTT_HOST;
const port = process.env.MQTT_PORT;
const clientId = "backend_" + Math.random().toString(8).substr(2, 4);
const mountPath = process.env.MQTT_MOUNTPOINT;
const connectTimeout = process.env.MQTT_RECONECTIMEOUT;
const reconnectPeriod = process.env.MQTT_RECONECT;

// connection option
const options = {
  clientId,
  connectTimeout,
  reconnectPeriod,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  keepalive: 60,
  rejectUnauthorized: false,
  clean: true,
  will: {
    topic: process.env.MQTT_WILL_TOPIC,
    payload: process.env.MQTT_WILL_MSG_OFF,
    qos: 0,
    retain: true,
  },
  // tls: {
  //  ca: fs.readFileSync('/path/to/ca.crt'),
  //   key: fs.readFileSync('/path/to/client.key'),
  //   cert: fs.readFileSync('/path/to/client.crt')
  // }
};

let connectUrl = "ws://" + host + ":" + port + mountPath;

var client = mqtt.connect(connectUrl, options);

// Cuando se conecta al servidor MQTT
client.on("connect", function () {
  console.log("Broker MQTT ok".green);

  // publicar un mensaje con QoS 1 y retenido por el broker
  client.publish(
    process.env.MQTT_WILL_TOPIC,
    process.env.MQTT_WILL_MSG_ON,
    { qos: 0, retain: true },
    function (error) {
      if (error) {
        console.error("Error al publicar mensaje:", error);
      } else {
        // console.log('Mensaje publicado con éxito.');
      }
    }
  );

  client.subscribe(process.env.MQTT_TOPIC_IN_TEMP1);
  client.subscribe(process.env.MQTT_TOPIC_IN_TEMP2);
  client.subscribe(process.env.MQTT_TOPIC_IN_HUM1);
  client.subscribe(process.env.MQTT_TOPIC_IN_DIST1);

  console.log(connectUrl.green);
});

client.on("reconnect", (error) => {
  console.log("reconnecting:".red, error);
});

client.on("offline", function () {
  console.log("Client is currently offline");
});

client.on("error", (error) => {
  console.log("Connection failed:", error);
});

function publishMsg(topic, message) {
  client.publish(topic, message);
}

function subscribeMsg(topic) {
  client.subscribe(topic);
}

function recibeMsg() {
  client.on("message", async (topic, message) => {
    // console.log("Message: ", message.toString());

    try {
      const payload = JSON.parse(message.toString());

      await guardar_datos(topic, payload);

      //console.log("Device: ", payload.device);
      //console.log("Name: ", payload.name);
      //console.log("Data: ", payload.data);
    } catch (error) {
      console.error("Error al analizar el mensaje JSON:", error);
    }
  });
}

guardar_datos = (topic, payload) => {
  return new Promise((resolve, reject) => {
    let query;
    const device = payload.device;
    const name = payload.name;
    const data = payload.data;

    if (topic === process.env.MQTT_TOPIC_IN_HUM1) {
      //console.log("Humedad sensor 1".yellow);

      query = `${process.env.DB_SAVE_HUM1} ('${device}', '${name}', '${data}', NOW())`;
    }

    if (topic === process.env.MQTT_TOPIC_IN_TEMP1) {
      //console.log("Temperatura sensor 1".yellow);

      query = `${process.env.DB_SAVE_TEMP1} ('${device}', '${name}', '${data}', NOW())`;
    }

    if (topic === process.env.MQTT_TOPIC_IN_TEMP2) {
      //console.log("Temperatura sensor 2".yellow);

      query = `${process.env.DB_SAVE_TEMP2} ('${device}', '${name}', '${data}', NOW())`;
    }

    if (topic === process.env.MQTT_TOPIC_IN_DIST1) {
      //console.log("Distancia sensor 1".yellow);

      query = `${process.env.DB_SAVE_DIST1} ('${device}', '${name}', '${data}', NOW())`;
    }

    if (!query) return false;

    bd_mqtt.query(query, (error) => {
      if (error) {
        return reject(error);
      } else {
        //console.log("Success".green);
        return resolve(true);
      }
    });
  });
};

module.exports = {
  publishMsg,
  subscribeMsg,
  recibeMsg,
};
