import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import ControllerMatche from '../controller/Matches.controller';
import MatchesMiddleware from '../middlewares/match.middleware';

const routers = Router();

routers.get('/', ControllerMatche.matches);
routers.post('/', validateToken, MatchesMiddleware.validateMatches, ControllerMatche.createMatches);
routers.patch('/:id', ControllerMatche.MatchUpdateProgress);
routers.patch('/:id/finish', ControllerMatche.MatchUpdate);

export default routers;
