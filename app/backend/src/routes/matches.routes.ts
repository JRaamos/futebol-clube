import { Request, Router, Response } from 'express';
import JWT from '../middlewares/ValidationsJWT';
import MatchesController from '../controllers/Metches.controller';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => matchesController.findAll(req, res));
matchesRouter.patch(
  '/matches/:id/finish',
  JWT.validateJWT,
  (req: Request, res: Response) => matchesController.findByIdUpdate(req, res),
);

export default matchesRouter;
