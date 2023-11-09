import { Request, Router, Response } from 'express';
import JWT from '../middlewares/ValidationsJWT';
import ValidationsMatches from '../middlewares/ValidationsMatches';
import MatchesController from '../controllers/Metches.controller';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => matchesController.findAll(req, res));
matchesRouter.patch(
  '/matches/:id/finish',
  JWT.validateJWT,
  (req: Request, res: Response) => matchesController.findByIdUpdate(req, res),
);
matchesRouter.patch(
  '/matches/:id',
  JWT.validateJWT,
  (req: Request, res: Response) => matchesController.findByIdUpdateGol(req, res),
);

matchesRouter.post(
  '/matches',
  JWT.validateJWT,
  ValidationsMatches.validateMatches,
  (req: Request, res: Response) => matchesController.create(req, res),
);

export default matchesRouter;
