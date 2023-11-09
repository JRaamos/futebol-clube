import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Metches.controller';

const matchesController = new MatchesController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => matchesController.getAllTeamsPoints(req, res),
);

export default leaderboardRouter;
