const {Database} = require('./../database/database')

/**
 * Clase que extiende de la configuración de la base de datos
 */
class P1Model extends Database{
    static create(app){
        return new P1Model(app.locals.mysqlConnectionPool);
    }

    /**
     * Retorna todos los registros de humedades obtenido por medio de query
     * @returns {Promise<*>}
     */
    getLogsHumedad(){
        return this.queryView({sql:"SELECT * FROM humedad;"})
    }

    /**
     * Retorna todos los registros de presiones barometricas obtenido por medio de query
     * @returns {Promise<*>}
     */
    getLogsPresionBarometrica(){
        return this.queryView({sql:"SELECT * FROM presion_barometrica;"})
    }

    /**
     * Retorna todos los registros de temperaturas obtenido por medio de query
     * @returns {Promise<*>}
     */
    getLogsTemperatura(){
        return this.queryView({sql:"SELECT * FROM temperatura;"})
    }

    /**
     * Retorna todos los registros de vientos obtenido por medio de query
     * @returns {Promise<*>}
     */
    getLogsViento(){
        return this.queryView({sql:"SELECT * FROM viento;"})
    }
}

module.exports = {P1Model};