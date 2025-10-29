import {Router} from "express";
import {UserController} from "./controller.js";

const router = Router();
const userController = new UserController();

// register user
router.post('/register', userController.registerUser);
// confirm email
router.get('/confirm-email/:token', userController.confirmEmail);
// login user
router.post('/login', userController.loginUser);

export default router;