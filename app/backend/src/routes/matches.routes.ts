import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Metches.controller';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => matchesController.findAll(req, res));

export default matchesRouter;
