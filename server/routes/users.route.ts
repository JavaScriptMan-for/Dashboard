import { Router } from "express";
import { register, verify } from "@controllers/auth.controller";

const router: Router = Router();

router.post('/register', register);
router.post('/verify', verify)

export default router;