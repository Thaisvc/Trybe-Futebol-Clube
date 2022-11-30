import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import ControllerMatche from '../controller/Matches.controller';

const routers = Router();

routers.get('/', ControllerMatche.matches);
routers.post('/', validateToken, ControllerMatche.createMatches);

export default routers;
