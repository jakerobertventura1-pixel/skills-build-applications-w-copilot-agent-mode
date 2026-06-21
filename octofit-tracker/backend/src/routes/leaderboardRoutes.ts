import { Router } from 'express';
import { getLeaderboard, getLeaderboardEntry } from '../controllers/leaderboardController';

const router = Router();

router.get('/', getLeaderboard);
router.get('/:id', getLeaderboardEntry);

export default router;
