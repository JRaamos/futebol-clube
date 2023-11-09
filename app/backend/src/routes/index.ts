import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';
import matchesRouter from './matches.routes';

const router = Router();

router.use(teamsRouter);
router.use(usersRouter);
router.use(matchesRouter);

export default router;
