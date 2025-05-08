import { query } from '../config/db.js';

// Crea un nuovo allenamento
export const createTraining = async (req, res) => {
  const { team_id, date, location, description } = req.body;
  try {
    await query('INSERT INTO trainings (id, team_id, date, location, description) VALUES (UUID(), ?, ?, ?, ?)', [team_id, date, location, description]);
    res.status(201).json({ message: 'Training created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create training session' });
  }
};

// Ottieni tutti gli allenamenti
export const getTrainings = async (req, res) => {
  try {
    const trainings = await query('SELECT * FROM trainings');
    res.status(200).json(trainings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch training sessions' });
  }
};

// Ottieni un allenamento specifico
export const getTrainingById = async (req, res) => {
  const { id } = req.params;
  try {
    const training = await query('SELECT * FROM trainings WHERE id = ?', [id]);
    if (training.length === 0) {
      return res.status(404).json({ error: 'Training session not found' });
    }
    res.status(200).json(training[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch training session' });
  }
};

// Modifica un allenamento
export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { date, location, description } = req.body;
  try {
    const result = await query('UPDATE trainings SET date = ?, location = ?, description = ? WHERE id = ?', [date, location, description, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Training session not found' });
    }
    res.status(200).json({ message: 'Training session updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update training session' });
  }
};

// Elimina un allenamento
export const deleteTraining = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM trainings WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Training session not found' });
    }
    res.status(200).json({ message: 'Training session deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete training session' });
  }
};
