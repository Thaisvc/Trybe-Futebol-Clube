import { Router } from 'express';
import ControllerMatche from '../controller/Matches.controller';

const routers = Router();

routers.get('/', ControllerMatche.matches);

export default routers;
