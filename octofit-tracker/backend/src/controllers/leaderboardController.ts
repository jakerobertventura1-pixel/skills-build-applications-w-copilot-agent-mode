import { Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

export const getLeaderboardEntry = async (req: Request, res: Response) => {
  try {
    const leaderboardEntry = await Leaderboard.findById(req.params.id);
    if (!leaderboardEntry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(leaderboardEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
};
