import { Router } from 'express';
import ControllerUser from '../controller/User.ontroller';
import ValidationLogin from '../middlewares/login.middleware';

const router = Router();

router.post('/', ValidationLogin.LoginValid, ControllerUser.LoginUser);

export default router;
