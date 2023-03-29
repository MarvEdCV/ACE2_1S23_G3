# MANUAL PARA LEVANTAR BACKEND

## Prerrequisitos

- NodeJs
- NPM
- Mysql

## INSTALAR DEPENDENCIAS

```bash
npm install 
```

## LEVANTAR ENTORNO DE DESARROLLO

```bash
npm run start-dev
```

## LEVANTAR ENTORNO DE PRODUCCIÓN

```bash
npm run start-prod
```

## NOTA IMPORTANTE PARA ARCHIVOS .ENV

En estos archivos se configuran las variables de entorno a utilizar, la estructura es la siguiente

```bash
HOST=<HOST_DE_BASE>
DATABASE_NAME=<NOMBRE DEL SCHEMA>
USER=<USUARIO_DE_CONEXION_MYSQL>
PASSWORD=<CONTRASENIA_DE_CONEXION_MYSQL>
PORT=<PUERTO>
```

El puerto normalmente en MYSQL es el ***3306***

## ENDPOINTS DISPONIBLES

```bash
[GET]
http://localhost:4010/api/humedad
http://localhost:4010/api/ultima-humedad
http://localhost:4010/api/viento
http://localhost:4010/api/ultimo-viento
http://localhost:4010/api/presion-barometrica
http://localhost:4010/api/ultima-presion-barometrica
http://localhost:4010/api/temperatura
http://localhost:4010/api/ultima-temperatura
```
