const {Database} = require('./../database/database')

/**
 * Clase que extiende de la configuración de la base de datos
 */
class ServiceModel extends Database{
    static create(app){
        return new ServiceModel(app.locals.mysqlConnectionPool);
    }

    getDefaultTime(){
        return this.queryView({
            sql: `SELECT td.* FROM tiempo_default td
                JOIN usuario u on td.tiempo_default_id = u.tiempo_default_id
                WHERE u.es_activo = 1`
        });
    }

    checkDefaultTime(defaultTimePomodoro,defaultTimeDescanso){
        return this.queryView({
            sql: `SELECT tiempo_default_id 
                 FROM tiempo_default 
                 WHERE tiempo_pomodoro = ${defaultTimePomodoro} AND tiempo_descanso = ${defaultTimeDescanso} LIMIT 1`
        })
    }

    saveDefaultTime(defaultTimePomodoro, defaultTimeDescanso){
        return this.queryView({sql: `INSERT INTO tiempo_default(tiempo_pomodoro,tiempo_descanso) VALUES(${defaultTimePomodoro},${defaultTimeDescanso})`})
    }

    saveUser(name,defaultTimeId){
        return this.queryView({sql: `INSERT INTO usuario(nombre, tiempo_default_id) VALUES('${name}', ${defaultTimeId})`});
    }

    async newUser(name, defaultTimePomodoro, defaultTimeDescanso) {
        // Se obtiene el id del tiempo default si existe, si no existe se crea y se obtiene el id nuevo.
        const defaultTime = await this.checkDefaultTime(defaultTimePomodoro, defaultTimeDescanso);
        let defaultTimeId = null;
        if(defaultTime.length > 0){
            defaultTimeId = defaultTime[0].tiempo_default_id;
        }else{
            const newDefaultTime = await this.saveDefaultTime(defaultTimePomodoro, defaultTimeDescanso);
            defaultTimeId = newDefaultTime.insertId;
        }

        const newUser = await this.saveUser(name, defaultTimeId);
        const newUserId = newUser.insertId;

        return this.queryView({sql:`SELECT * FROM usuario WHERE usuario_id = ${newUserId}`});
    }

    desactivateAllUsers(){
        return this.queryView({sql: `UPDATE usuario SET es_activo = 0`})
    }

    changeStatusUser(userId){
        return this.queryView({sql: `UPDATE usuario SET es_activo = 1 WHERE usuario_id = ${userId}`});
    }

    async verifyExistUser(userId){
        const user = await this.queryView({sql: `SELECT * FROM usuario WHERE usuario_id=${userId}`})
        if( user.length > 0) {
            return true;
        }else{
            return false;
        }
    }
    async activateUser(userId) {
        if(!await this.verifyExistUser(userId)){
            return {"cambio_usuario_activo":false, "mensaje": "El usuario no existe"}
        }
        const desactivateAll = await this.desactivateAllUsers();
        if(desactivateAll.changedRows <= 0){
            return {"cambio_usuario_activo":false,"mensaje":"Ocurrio un error al tratar de cambiar el campo 'es_valido=0' para todos los usuarios"}
        }
        const changeStatus = await this.changeStatusUser(userId);
        if( changeStatus.changedRows <= 0){
            return {"cambio_usuario_activo":false,"mensaje":"Ocurrio un error al tratarle de asignar el campo 'es_valido=1' al usuario"}
        }

        return {"cambio_usuario_activo":true,"mensaje":`El usuario con el id -> ${userId} ahora es el usuario activo`}
    }
}

module.exports = {ServiceModel: ServiceModel};