import { Router } from 'express';
import { getWorkouts, getWorkoutById } from '../controllers/workoutController';

const router = Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);

export default router;
