import express from "express";
import morgan from "morgan";

const app = express();

app.set("port",4010);

// Middlewares
app.use(morgan("dev"));

export default  app;