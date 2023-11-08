import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/teams', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

export default teamsRouter;
