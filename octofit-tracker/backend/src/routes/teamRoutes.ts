import { Router } from 'express';
import {
  getTeams,
  getTeamById,
  createTeam,
  addMemberToTeam,
  removeMemberFromTeam,
  deleteTeam,
} from '../controllers/teamController';

const router = Router();

router.get('/', getTeams);
router.get('/:id', getTeamById);
router.post('/', createTeam);
router.post('/member/add', addMemberToTeam);
router.post('/member/remove', removeMemberFromTeam);
router.delete('/:id', deleteTeam);

export default router;
