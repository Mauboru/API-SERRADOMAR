import { Router } from 'express';
import { getUsers, setUserActive, setUserInactive } from '../controllers/profileController';

const router = Router();

router.get("/getUsers", getUsers);
router.post("/setUserActive/:id", setUserActive);
router.post("/setUserInactive/:id", setUserInactive);

export default router;
