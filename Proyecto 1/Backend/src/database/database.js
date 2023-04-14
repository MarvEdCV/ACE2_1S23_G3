class Database {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    /**
     * Obtiene un objeto de conexión a la base de datos
     * @returns {Pool Connection}
     */
    getConnectionPool() {
        return this.connectionPool;
    }

    /**
     * Ejecuta un query multiple, utilizado para ejecutar SP´s y analizar la estructura que la ejecución
     * de un SP devuelve
     * @param sql Insturcción de ejecución
     * @param params Parametros para la instrucción
     * @returns {Promise<unknown>}
     */
    queryMultiple({ sql, params = [] }) {
        return new Promise((resolve, reject) => {
            if (!sql || !sql.length) {
                return reject('Invalid Query');
            }
            this.getConnectionPool().query(sql, params, function (err, result) {
                if (err) {
                    return reject(err);
                }

                if (!result || !result[0]) {
                    return reject(new Error('Invalid db response'));
                }

                resolve(result[0]);
            });
        });
    }

    /**
     * Ejecuta un query simple, como una select a una tabla
     * @param sql
     * @param params
     * @returns {Promise<unknown>}
     */
    queryView({sql, params = []}) {
        return new Promise((resolve, reject) => {
            if (!sql || !sql.length) {
                return reject('Invalid query');
            }
            this.getConnectionPool().query(sql, params, function (err, result) {
                if (err) {
                    return reject(err);
                }
                if (!result) {
                    return reject(new Error('Invalid db response'));
                }
                resolve(result);
            });
        });
    }
}
module.exports = {Database};