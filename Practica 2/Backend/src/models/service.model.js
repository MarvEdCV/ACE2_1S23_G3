const {Database} = require('./../database/database')

const DURACION_DEFAULT = 0;
const PRIMER_CICLO = 1;
const SEGUNDO_CICLO = 2;
const TERCER_CICLO = 3;
const CUARTO_CICLO = 4;
const TIPO_POMODORO = 1;
const TIPO_DESCANSO = 2;
const TIEMPO_MINIMO = 1;
const TIEMPO_MAXIMO = 45;
const PENALIZACION_POR_PARARSE = 1;
const PENALIZACION_POR_SENTARSE = 2;
const CUMPLIMIENTO_POR_SENTARSE = 3;
const CUMPLIMIENTO_POR_PARARSE = 4;

/**
 * Clase que extiende de la configuración de la base de datos
 */
class ServiceModel extends Database {
    static create(app) {
        return new ServiceModel(app.locals.mysqlConnectionPool);
    }

    getDefaultTime() {
        return this.queryView({
            sql: `SELECT td.* FROM tiempo_default td
                JOIN usuario u on td.tiempo_default_id = u.tiempo_default_id
                WHERE u.es_activo = 1 LIMIT 1`
        });
    }

    checkDefaultTime(defaultTimePomodoro, defaultTimeDescanso) {
        return this.queryView({
            sql: `SELECT tiempo_default_id 
                 FROM tiempo_default 
                 WHERE tiempo_pomodoro = ${defaultTimePomodoro} AND tiempo_descanso = ${defaultTimeDescanso} LIMIT 1`
        })
    }

    saveDefaultTime(defaultTimePomodoro, defaultTimeDescanso) {
        return this.queryView({sql: `INSERT INTO tiempo_default(tiempo_pomodoro,tiempo_descanso) VALUES(${defaultTimePomodoro},${defaultTimeDescanso})`})
    }

    saveUser(name, defaultTimeId) {
        return this.queryView({sql: `INSERT INTO usuario(nombre, tiempo_default_id) VALUES('${name}', ${defaultTimeId})`});
    }

    async newUser(name, defaultTimePomodoro, defaultTimeDescanso) {
        // Se obtiene el id del tiempo default si existe, si no existe se crea y se obtiene el id nuevo.
        const defaultTime = await this.checkDefaultTime(defaultTimePomodoro, defaultTimeDescanso);
        let defaultTimeId = null;
        if (defaultTime.length > 0) {
            defaultTimeId = defaultTime[0].tiempo_default_id;
        } else {
            const newDefaultTime = await this.saveDefaultTime(defaultTimePomodoro, defaultTimeDescanso);
            defaultTimeId = newDefaultTime.insertId;
        }

        const newUser = await this.saveUser(name, defaultTimeId);
        const newUserId = newUser.insertId;

        return this.queryView({sql: `SELECT * FROM usuario WHERE usuario_id = ${newUserId}`});
    }

    desactivateAllUsers() {
        return this.queryView({sql: `UPDATE usuario SET es_activo = 0`})
    }

    changeStatusUser(userId) {
        return this.queryView({sql: `UPDATE usuario SET es_activo = 1 WHERE usuario_id = ${userId}`});
    }

    async verifyExistUser(userId) {
        const user = await this.queryView({sql: `SELECT * FROM usuario WHERE usuario_id=${userId}`})
        if (user.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    getActiveUser() {
        return this.queryView({sql: `SELECT * FROM usuario WHERE es_activo=1`})
    }

    async activateUser(userId) {
        if (!await this.verifyExistUser(userId)) {
            return {"cambio_usuario_activo": false, "mensaje": "El usuario no existe"}
        }
        const activeUser = await this.getActiveUser();
        if (activeUser[0].usuario_id == userId) {
            return {
                "cambio_usuario_activo": false,
                "mensaje": "No puedes activar al usuario que ya se encuentra activo"
            }
        }
        const lastPomodoro = await this.lastPomodoro();
        const lastPomodoroId = lastPomodoro[0].pomodoro_id;
        const lastCyclePomodoro = await this.lastCyclePomodoro(lastPomodoroId);
        if (lastCyclePomodoro[0].numero_ciclo !== CUARTO_CICLO) {
            return {
                "cambio_usuario_activo": false,
                "mensaje": "No puedes activar a un usuario distinto sin antes terminar los 4 ciclos del pomodoro actual"
            }
        }
        const desactivateAll = await this.desactivateAllUsers();
        if (desactivateAll.changedRows <= 0) {
            return {
                "cambio_usuario_activo": false,
                "mensaje": "Ocurrio un error al tratar de cambiar el campo 'es_valido=0' para todos los usuarios"
            }
        }
        const changeStatus = await this.changeStatusUser(userId);
        if (changeStatus.changedRows <= 0) {
            return {
                "cambio_usuario_activo": false,
                "mensaje": "Ocurrio un error al tratarle de asignar el campo 'es_valido=1' al usuario"
            }
        }

        return {
            "cambio_usuario_activo": true,
            "mensaje": `El usuario con el id -> ${userId} ahora es el usuario activo`
        }
    }

    getUsers() {
        return this.queryView({
            sql: `SELECT u.usuario_id, 
                u.nombre, 
                u.es_activo, 
                td.tiempo_pomodoro, 
                td.tiempo_descanso 
                FROM usuario u 
                JOIN tiempo_default td ON u.tiempo_default_id = td.tiempo_default_id`
        });
    }

    savePomodoro() {
        return this.queryView({
            sql: `INSERT INTO pomodoro (usuario_id) SELECT usuario_id FROM usuario WHERE es_activo=1 LIMIT 1;`
        })
    }

    saveCycle(time, typeId, pomodoroId, cycleNumber) {
        return this.queryView({sql: `INSERT INTO ciclo(tiempo,tipo_ciclo_id,pomodoro_id,numero_ciclo) VALUES(${time},${typeId},${pomodoroId},${cycleNumber})`})
    }

    lastPomodoro() {
        return this.queryView({sql: `SELECT * FROM pomodoro p JOIN usuario u ON p.usuario_id = u.usuario_id WHERE u.es_activo=1 ORDER BY p.fecha_creacion DESC LIMIT 1`})
    }

    allPomodoros() {
        return this.queryView({sql: `SELECT * FROM pomodoro p JOIN usuario u ON p.usuario_id = u.usuario_id WHERE u.es_activo=1 ORDER BY p.fecha_creacion DESC`})
    }

    lastCycle(pomodoroId) {
        return this.queryView({sql: `SELECT * FROM ciclo WHERE pomodoro_id = ${pomodoroId} ORDER BY fecha_creacion DESC LIMIT 1`})
    }

    allCycles(pomodoroId) {
        return this.queryView({sql: `SELECT c.ciclo_id,c.tiempo,c.fecha_creacion,c.numero_ciclo,tc.tipo FROM ciclo c JOIN tipo_ciclo tc ON c.tipo_ciclo_id = tc.tipo_ciclo_id WHERE c.pomodoro_id = ${pomodoroId} ORDER BY c.fecha_creacion ASC`})
    }

    allPenaltys(pomodoroId){
        return this.queryView({sql: `SELECT p.penalizacion_id, p.tiempo, p.fecha_creacion,tp.nombre FROM penalizacion p JOIN tipo_penalizacion tp ON p.tipo_penalizacion_id = tp.tipo_penalizacion_id WHERE p.pomodoro_id = ${pomodoroId} ORDER BY p.fecha_creacion ASC`})
    }

    lastCyclePomodoro(pomodoroId) {
        return this.queryView({sql: `SELECT * FROM ciclo WHERE pomodoro_id = ${pomodoroId} AND tipo_ciclo_id=1 ORDER BY fecha_creacion DESC LIMIT 1`})
    }

    lastCycleDescanso(pomodoroId) {
        return this.queryView({sql: `SELECT * FROM ciclo WHERE pomodoro_id = ${pomodoroId} AND tipo_ciclo_id=2 ORDER BY fecha_creacion DESC LIMIT 1`})
    }

    async newPomodoro(time, cycleNumber, type) {
        let cycle;
        let response = null;
        // Validacion de tipo de pomodoro
        switch (type) {
            case 1 :
                type = TIPO_POMODORO;
                break;
            case 2:
                type = TIPO_DESCANSO;
                break;
            default:
                response = {
                    "creación_nuevo_ciclo": false,
                    "mensaje": "El valor del tipo no existe, los valores son 1 -> Pomodoro || 2 -> Descanso"
                };
        }
        // Validacion de numero de ciclo
        switch (cycleNumber) {
            case 1 :
                cycleNumber = PRIMER_CICLO;
                break;
            case 2:
                cycleNumber = SEGUNDO_CICLO;
                break;
            case 3:
                cycleNumber = TERCER_CICLO;
                break;
            case 4:
                cycleNumber = CUARTO_CICLO;
                break;
            default:
                response = {
                    "creación_nuevo_ciclo": false,
                    "mensaje": "El valor del numero de ciclo no existe, los valores son 1,2,3 y 4"
                };
        }
        // Si el tiempo viene establecido el DEFAULT del usuario se obtiene de la DB, si no se valida que este en rango de 1 a 45
        if (time === DURACION_DEFAULT) {
            const defaultTime = await this.getDefaultTime();
            time = defaultTime[0].tiempo_pomodoro;
        } else if (time < TIEMPO_MINIMO || time > TIEMPO_MAXIMO) {
            response = {
                "creación_nuevo_ciclo": false,
                "mensaje": "El valor del tiempo del ciclo es inválido su rango es como minimo 1 y como maximo 45"
            };
        }
        // Si alguna error en los parametros salta se responde sin crear ningun ciclo
        if (response != null) {
            return response;
        }

        if (cycleNumber === PRIMER_CICLO && type === TIPO_POMODORO) {
            //Si es el primer ciclo se crea el nuevo pomodoro
            const newPomodoro = await this.savePomodoro();
            cycle = await this.saveCycle(time, type, newPomodoro.insertId, cycleNumber);
        } else {

            // Si es segundo, tercer o cuarto ciclo se obtiene el ultimo pomodoro del usuario
            const lastPomodoro = await this.lastPomodoro();
            const lastPomodoroId = lastPomodoro[0].pomodoro_id;

            //Obtenemos el utlimo ciclo del usuario en su ultimo pomodoro
            const lastCycle = await this.lastCycle(lastPomodoroId);
            const lastCyclePomodoro = await this.lastCyclePomodoro(lastPomodoroId);
            const lastCycleDescanso = await this.lastCycleDescanso(lastPomodoroId);
            const lastCycleType = lastCycle[0].tipo_ciclo_id;
            if (lastCycle[0].tiempo !== time) {
                return {
                    "creación_nuevo_ciclo": false,
                    "mensaje": `No puedes cambiar el tiempo transcurrido en cada actividad entre ciclos!! Tiempo de ciclo anterior -> ${lastCycle[0].tiempo} Tiempo de ciclo enviado -> ${time}`
                };
            }

            if (lastCycleType === type) {
                return {
                    "creación_nuevo_ciclo": false,
                    "mensaje": `No puedes agregar un ciclo del mismo tipo al anterior a menos que sea ciclo inicial!! Tipo ciclo anterior -> ${lastCycleType} Tpo ciclo enviado -> ${type}`
                };
            }
            if (type === TIPO_POMODORO) {
                if (cycleNumber !== (lastCyclePomodoro[0].numero_ciclo + 1)) {
                    return {
                        "creación_nuevo_ciclo": false,
                        "mensaje": `El numero del ciclo de tipo ACTIVIDAD tiene que ser una unidad mayor a el ciclo anterior!!! Numero anterior -> ${lastCyclePomodoro[0].numero_ciclo} Numero actual -> ${cycleNumber}`
                    };
                }
            }
            if (type === TIPO_DESCANSO && cycleNumber !== PRIMER_CICLO) {
                if (cycleNumber !== (lastCycleDescanso[0].numero_ciclo + 1)) {
                    return {
                        "creación_nuevo_ciclo": false,
                        "mensaje": `El numero del ciclo de tipo DESCANSO tiene que ser una unidad mayor a el ciclo anterior!!! Numero anterior -> ${lastCycleDescanso[0].numero_ciclo} Numero actual -> ${cycleNumber}`
                    };
                }
            }
            cycle = await this.saveCycle(time, type, lastPomodoroId, cycleNumber);
        }
        const newCycleId = cycle.insertId;
        return this.queryView({sql: `SELECT * FROM ciclo WHERE ciclo_id = ${newCycleId}`})

    }

    async validateCycle(cycleNumber) {
        // Si es segundo, tercer o cuarto ciclo se obtiene el ultimo pomodoro del usuario
        const lastPomodoro = await this.lastPomodoro();
        const lastPomodoroId = lastPomodoro[0].pomodoro_id;
        //Obtenemos el utlimo ciclo del usuario en su ultimo pomodoro
        const lastCycle = await this.lastCycle(lastPomodoroId);

        if (cycleNumber > 4 || cycleNumber < 1) {
            return {
                "creación_nueva_penalizacion": false,
                "mensaje": "El valor del numero de ciclo no existe, los valores son 1,2,3 o 4"
            };
        }
        if (lastCycle[0].numero_ciclo !== cycleNumber) {
            return {
                "creación_nueva_penalizacion": false,
                "mensaje": `El valor del numero de ciclo enviado a la penalización debe ser exactamente igual que el ultimo ciclo creado ultimo ciclo creado -> ${lastCycle[0].numero_ciclo}, ciclo enviado -> ${cycleNumber}`
            };
        }
        return true;
    }

    async validateType(type) {
        // Si es segundo, tercer o cuarto ciclo se obtiene el ultimo pomodoro del usuario
        const lastPomodoro = await this.lastPomodoro();
        const lastPomodoroId = lastPomodoro[0].pomodoro_id;
        //Obtenemos el utlimo ciclo del usuario en su ultimo pomodoro
        const lastCycle = await this.lastCycle(lastPomodoroId);
        if (type < PENALIZACION_POR_PARARSE || type > PENALIZACION_POR_SENTARSE) {
            return {
                "creación_nueva_penalizacion": false,
                "mensaje": "El valor del numero de tipo de penalizacion no existe, los valores son 1 -> Esta parado cuando debería estar sentado, 2 -> Esta sentado cuando debería estar parado"
            };
        }
        if (lastCycle[0].tipo_ciclo_id === TIPO_POMODORO && type === PENALIZACION_POR_SENTARSE) {
            return {
                "creación_nueva_penalizacion": false,
                "mensaje": `No puedes penalizar a un ciclo de actividad por sentarse, el último ciclo registrado es de tipo pomodoro, y estas intentando penalizarlo por sentarse, recuerda 1 -> Esta parado cuando debería estar sentado, 2 -> Esta sentado cuando debería estar parado`
            }
        }
        if (lastCycle[0].tipo_ciclo_id === TIPO_DESCANSO && type === PENALIZACION_POR_PARARSE) {
            return {
                "creación_nueva_penalizacion": false,
                "mensaje": `No puedes penalizar a un ciclo de descanso por pararse, el último ciclo registrado es de tipo descanso, y estas intentando penalizarlo por pararse, recuerda 1 -> Esta parado cuando debería estar sentado, 2 -> Esta sentado cuando debería estar parado`
            }
        }
        return true;
    }

    savePenalty(time, type, pomodoroId) {
        return this.queryView({
            sql: `INSERT INTO penalizacion (tiempo,tipo_penalizacion_id,pomodoro_id) VALUES(${time},${type},${pomodoroId});`
        })
    }

    async updateUser(defaultTimePomodoro, defaultTimeDescanso) {

        // Si es segundo, tercer o cuarto ciclo se obtiene el ultimo pomodoro del usuario
        const lastPomodoro = await this.lastPomodoro();
        const lastPomodoroId = lastPomodoro[0].pomodoro_id;
        //Obtenemos el utlimo ciclo del usuario en su ultimo pomodoro
        const lastCycle = await this.lastCycle(lastPomodoroId);

        const defaultTime = await this.checkDefaultTime(defaultTimePomodoro, defaultTimeDescanso);
        let defaultTimeId = null;
        if (defaultTime.length > 0) {
            defaultTimeId = defaultTime[0].tiempo_default_id;
        } else {
            const newDefaultTime = await this.saveDefaultTime(defaultTimePomodoro, defaultTimeDescanso);
            defaultTimeId = newDefaultTime.insertId;
        }
        let tipo;
        if (lastCycle[0].tipo_ciclo_id === TIPO_POMODORO) {
            tipo = 'actividad';
        } else {
            tipo = 'descanso'
        }
        await this.queryView({sql: `UPDATE usuario SET tiempo_default_id = ${defaultTimeId} WHERE es_activo = 1`})
        if (lastCycle[0].numero_ciclo === CUARTO_CICLO && lastCycle[0].tipo_ciclo_id === TIPO_POMODORO) {
            return {
                "cambio_tiempo_default": true,
                "inmediato": true,
                "mensaje": "El tiempo default del usuario fue cambiado con éxito de manera inmediata"
            }
        }
        return {
            "cambio_tiempo_default": true,
            "inmediato": false,
            "mensaje": `El tiempo default del usuario fue cambiado con éxito, se encuentra un pomodoro activo en el ciclo ${lastCycle[0].numero_ciclo} de tipo ${tipo}, se reflejará la actualización hasta el siguiente pomodoro`
        }
    }


    async penalty(typePenalty, time, cycleNumber) {
        time = parseFloat(time);
        // Si es segundo, tercer o cuarto ciclo se obtiene el ultimo pomodoro del usuario
        const lastPomodoro = await this.lastPomodoro();
        const lastPomodoroId = lastPomodoro[0].pomodoro_id;
        //Obtenemos el utlimo ciclo del usuario en su ultimo pomodoro
        const lastCycle = await this.lastCycle(lastPomodoroId);


        const isValidCycle = await this.validateCycle(cycleNumber);
        if (isValidCycle !== true) {
            return isValidCycle;
        }
        const isValidType = await this.validateType(typePenalty);
        if (isValidType !== true) {
            return isValidType;
        }

        const newPenalty = await this.savePenalty(time, typePenalty, lastPomodoroId);

        //GUARDAMOS CUMPLIMEINTO
        //CALCULAMOS EL TIEMPO
        const tiempo_cumplimiento = lastCycle[0].tiempo - time;
        if (typePenalty === PENALIZACION_POR_PARARSE) {
            await this.savePenalty(tiempo_cumplimiento, CUMPLIMIENTO_POR_SENTARSE, lastPomodoroId);
        } else if (typePenalty === PENALIZACION_POR_SENTARSE) {
            await this.savePenalty(tiempo_cumplimiento, CUMPLIMIENTO_POR_PARARSE, lastPomodoroId);
        }

        return this.queryView({sql: `SELECT * FROM penalizacion WHERE penalizacion_id = ${newPenalty.insertId}`})
    }

    async getDataGraficas() {
        const user = await this.getActiveUser()
        const allPomodoros = await this.allPomodoros();
        if (allPomodoros.length > 0) {
            const pomodoroResponse = {};
            for (const pomodoro of allPomodoros) {
                const cycles = await this.allCycles(pomodoro.pomodoro_id);
                const penaltys = await this.allPenaltys(pomodoro.pomodoro_id);
                pomodoroResponse[pomodoro.pomodoro_id] = {ciclos:cycles,penalizaciones:penaltys};
            }
            const result = {pomodoro: pomodoroResponse}
            return {
                "identificador":user[0].usuario_id,
                "usuario":user[0].nombre,
                "fecha_creacion":user[0].fecha_creacion,
                "fecha_actualizacion":user[0].fecha_actualizacion,
                result
            }
        }

    }
}

module.exports = {ServiceModel: ServiceModel};