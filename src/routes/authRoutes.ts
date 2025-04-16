import { Router } from 'express';
import { registerUser, login, proxyDashboard   } from '../controllers/authController';

const router = Router();

router.post("/registerUser", registerUser);
router.post("/login", login);
router.get("/dash-url", proxyDashboard);

export default router;
