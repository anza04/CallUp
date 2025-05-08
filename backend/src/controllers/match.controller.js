import { query } from '../config/db.js';

// Crea una nuova partita
export const createMatch = async (req, res) => {
  const { team_1_id, team_2_id, date, location, description } = req.body;
  try {
    await query('INSERT INTO matches (id, team_1_id, team_2_id, date, location, description) VALUES (UUID(), ?, ?, ?, ?, ?)', 
                [team_1_id, team_2_id, date, location, description]);
    res.status(201).json({ message: 'Match created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create match' });
  }
};

// Ottieni tutte le partite
export const getMatches = async (req, res) => {
  try {
    const matches = await query('SELECT * FROM matches');
    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
};

// Ottieni una partita specifica
export const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await query('SELECT * FROM matches WHERE id = ?', [id]);
    if (match.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json(match[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch match' });
  }
};

// Modifica una partita
export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { date, location, description } = req.body;
  try {
    const result = await query('UPDATE matches SET date = ?, location = ?, description = ? WHERE id = ?', 
                               [date, location, description, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json({ message: 'Match updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update match' });
  }
};

// Elimina una partita
export const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM matches WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete match' });
  }
};
