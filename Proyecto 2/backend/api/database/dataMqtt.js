const colors = require("colors");
const { createPool } = require("mysql");

//--------------------------------------------------------------------

config = {
  host: process.env.MYSQL_HOST_MQTT,
  user: process.env.MYSQL_USER_MQTT,
  password: process.env.MYSQL_PASS_MQTT,
  database: process.env.MYSQL_DTBASE_MQTT,
  connectionLimit: process.env.MYSQL_LIMITE_MQTT,
  port: process.env.MYSQL_PORT_MQTT,
  dateStrings: true,
  debug: false,
};

const pool = createPool(config);

pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.".red);
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections".red);
    }

    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused".red);
    }
  }

  if (connection) {
    connection.release();
    console.log("DB MQTT ok".green);
  }

  // Función para reconectar
  const handleDisconnect = () => {
    console.log("Lost connection to database, trying to reconnect...".red);
    pool = createPool(config);
    setTimeout(() => {
      pool.getConnection((err, connection) => {
        if (err) {
          handleDisconnect();
        } else {
          console.log("Database reconnected!".green);
          connection.release();
        }
      });
    }, 2000); // tiempo de espera antes de intentar la reconexión
  };

  // Manejador de eventos de error del pool
  pool.on("error", (err) => {
    console.error("Database error: ", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });

  return;
});

module.exports = pool;
