import { Router } from "express";
import * as AuthController from "controllers/authController";

const router = Router();

router.post("/registerUser", AuthController.registerUser);
router.post("/login", AuthController.login);

export default router;