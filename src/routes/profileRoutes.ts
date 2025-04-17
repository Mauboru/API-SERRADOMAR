import { Router } from 'express';
import { getUsersPending   } from '../controllers/profileController';

const router = Router();

router.get("/getUsersPending", getUsersPending);

export default router;
