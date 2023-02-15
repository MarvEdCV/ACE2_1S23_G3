const {Database} = require('./../database/database')

/**
 * Clase que extiende de la configuración de la base de datos
 */
class P1Model extends Database{
    static create(app){
        return new P1Model(app.locals.mysqlConnectionPool);
    }

    /**
     * Retorna todos los registros de la tabla indicada obtenido por medio de query
     * @param table nombre de la tabla de la cual se desea obtener registros
     * @returns {Promise<*>}
     */
    getLogs(table){
        return this.queryView({sql:`SELECT * FROM ${table}`})
    }

    /**
     * Retorna el ultimo registro de la tabla especificada por medio de query
     * @param table nombre de la tabla de la cual se desea obtener el ultimo registro
     * @returns {Promise<*>}
     */
    getLast(table){
        return this.queryView({sql:`SELECT * FROM ${table} ORDER BY fecha_creacion DESC LIMIT 1`})
    }
    
    saveHumedad(humedad_relativa,punto_rocio,humedad_absoluta){
        return this.queryView({sql:`INSERT INTO humedad (humedad_relativa,punto_rocio,humedad_absoluta) VALUES (${humedad_relativa},${punto_rocio},${humedad_absoluta})`})
    }

    savePresionBarometrica(presion){
        return this.queryView({sql:`INSERT INTO presion_barometrica (presion_barometrica) VALUES(${presion})`})
    }

    saveTemperatura(temperatura){
        return this.queryView({sql:`INSERT INTO temperatura(temperatura) VALUES(${temperatura})`})
    }

    saveViento(velocidad,direccion){
        return this.queryView({sql:`INSERT INTO viento(velocidad,direccion) VALUES(${velocidad},${direccion})`})
    }
}

module.exports = {P1Model};