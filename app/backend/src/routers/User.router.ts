import { Router } from 'express';
import ControllerUser from '../controller/User.ontroller';
import ValidationLogin from '../middlewares/login.middleware';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/', ValidationLogin.LoginValid, ControllerUser.LoginUser);
router.get('/validate', validateToken, ControllerUser.checkedUser);

export default router;
