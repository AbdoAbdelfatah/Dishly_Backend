import express from "express";
import userRouter from "./modules/user/router.js";
import menuItemRouter from "./modules/menuItem/router.js";
import offerRouter from "./modules/offer/router.js";
import commentRouter from "./modules/comment/router.js";
import {globaleResponse} from "./middlewares/error.middleware.js";

const app = express();

// global middlewares
app.use(express.json());

// register routes
app.use('/user', userRouter);
app.use('/menu-items', menuItemRouter);
app.use('/offers', offerRouter);
app.use('/comments', commentRouter);
 
// global error handler (must be after routes)
app.use(globaleResponse);

export default app;
