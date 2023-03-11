const {Database} = require('./../database/database')

/**
 * Clase que extiende de la configuración de la base de datos
 */
class ServiceModel extends Database{
    static create(app){
        return new ServiceModel(app.locals.mysqlConnectionPool);
    }

}

module.exports = {P1Model: ServiceModel};