import { CommentController } from "./controller.js";
import express from "express";
import { auth } from "../../middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../middlewares/authorization.middleware.js";
import { systemRoles } from "../../utils/system-roles.util.js";
import { errorHandler } from "../../middlewares/error.middleware.js";
const router = express.Router();
const commentController = new CommentController();

router.post('/',errorHandler(auth()),errorHandler(authorizationMiddleware(systemRoles.CUSTOMER)),commentController.createComment);
router.get('/menu-item/:menuItemId',  commentController.getCommentsByMenuItem);
export default router;