import express from "express";
 
import {errorHandler} from "./middlewares/error.middleware.js";

const app = express();

// global middlewares
app.use(express.json());

// register routes
 

// global error handler (must be after routes)
app.use(errorHandler);

export default app;
