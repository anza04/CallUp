import { Router } from 'express';
import { createTraining, getTrainings, getTrainingById, updateTraining, deleteTraining } from '../controllers/training.controller.js';

const router = Router();

// Crea un nuovo allenamento
router.post('/', createTraining);

// Ottieni tutti gli allenamenti
router.get('/', getTrainings);

// Ottieni un allenamento specifico
router.get('/:id', getTrainingById);

// Modifica un allenamento esistente
router.put('/:id', updateTraining);

// Elimina un allenamento
router.delete('/:id', deleteTraining);

export {router};
