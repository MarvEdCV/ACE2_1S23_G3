import dotenv from "dotenv";
dotenv.config({path: `./.env.${process.env.NODE_ENV}`});
export default {
    mysql:{
        host: "104.197.201.2",
        user: "root",
        password: "admin-arqui2",
        port: "3306",
        database: "acye2_proyecto1",
        connectionLimit: 10
    }
}
