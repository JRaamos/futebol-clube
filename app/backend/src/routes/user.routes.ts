import { Request, Router, Response } from 'express';
import UsersController from '../controllers/Users.controller';
import ValidationsLogin from '../middlewares/ValidationsLogin';
import JWT from '../middlewares/ValidationsJWT';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/login',
  ValidationsLogin.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);
usersRouter.get(
  '/login/role',
  JWT.validateJWT,
  (req: Request, res: Response) => usersController.findByEmail(req, res),
);

export default usersRouter;
