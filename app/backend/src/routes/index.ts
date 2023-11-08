import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';

const router = Router();

router.use(teamsRouter);
router.use(usersRouter);

export default router;
