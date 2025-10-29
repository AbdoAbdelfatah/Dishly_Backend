import express from "express";
import userRouter from "./modules/user/router.js";
import {globaleResponse} from "./middlewares/error.middleware.js";

const app = express();

// global middlewares
app.use(express.json());

// register routes
app.use('/user', userRouter);
 

// global error handler (must be after routes)
app.use(globaleResponse);

export default app;
