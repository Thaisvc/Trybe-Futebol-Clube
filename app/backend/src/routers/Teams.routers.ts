import { Router } from 'express';
import ControllerTeam from '../controller/Teams.controller';

const router = Router();

router.get('/', ControllerTeam.TeamGet);

export default router;
