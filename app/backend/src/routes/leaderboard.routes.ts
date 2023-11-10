import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Metches.controller';

const matchesController = new MatchesController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard',
  (req: Request, res: Response) => matchesController.getAllTeamsPointsInProgress(req, res),
);

leaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => matchesController.getAllTeamsPoints(req, res),
);
leaderboardRouter.get(

  '/leaderboard/away',
  (req: Request, res: Response) => matchesController.getAllTeamsPointsAway(req, res),
);

export default leaderboardRouter;
