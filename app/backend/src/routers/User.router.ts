import { Router } from 'express';
import ControllerUser from '../controller/User.ontroller';

const router = Router();

router.post('/', ControllerUser.LoginUser);

export default router;
