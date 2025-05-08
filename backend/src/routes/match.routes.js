import { Router } from 'express';
import { createMatch, getMatches, getMatchById, updateMatch, deleteMatch } from '../controllers/match.controller.js';

const router = Router();

// Crea una nuova partita
router.post('/', createMatch);

// Ottieni tutte le partite
router.get('/', getMatches);

// Ottieni una partita specifica
router.get('/:id', getMatchById);

// Modifica una partita esistente
router.put('/:id', updateMatch);

// Elimina una partita
router.delete('/:id', deleteMatch);

export {router};
