import { Request, Router, Response } from 'express';
import UsersController from '../controllers/Users.controller';
import ValidationsLogin from '../middlewares/ValidationsLogin';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/login',
  ValidationsLogin.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);

export default usersRouter;
