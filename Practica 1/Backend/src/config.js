import dotenv from "dotenv";
dotenv.config({path: `./.env.${process.env.NODE_ENV}`});
export default {
    mysql:{
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.PORT,
        database: process.env.DATABASE_NAME,
        connectionLimit: 10
    }
}
