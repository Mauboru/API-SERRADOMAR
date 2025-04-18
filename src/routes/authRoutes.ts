import { Router } from 'express';
import { registerUser, login, proxyDashboard, sendEmailReset } from '../controllers/authController';

const router = Router();

router.post("/registerUser", registerUser);
router.post("/login", login);
router.get("/dash-url", proxyDashboard);
router.post("/sendEmailReset", sendEmailReset);

export default router;
