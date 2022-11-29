import { Router } from 'express';
import ControllerTeam from '../controller/Teams.controller';

const router = Router();

router.get('/', ControllerTeam.TeamGet);
router.get('/:id', ControllerTeam.getIdTeam);

export default router;
