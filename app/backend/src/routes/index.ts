import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';
import matchesRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use(teamsRouter);
router.use(usersRouter);
router.use(matchesRouter);
router.use(leaderboardRouter);

export default router;
