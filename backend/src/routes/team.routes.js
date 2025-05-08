import { Router } from 'express';
import { createTeam, getTeams, getTeamById, updateTeam, deleteTeam } from '../controllers/team.controller.js';
const router = Router();

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:id', getTeamById);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export {router};
