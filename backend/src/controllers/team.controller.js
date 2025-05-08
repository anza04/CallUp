import { query } from '../config/db.js';

export const createTeam = async (req, res) => {
  const { name, coach_id } = req.body;
  try {
    await query('INSERT INTO teams (id, name, coach_id) VALUES (UUID(), ?, ?)', [name, coach_id]);
    res.status(201).json({ message: 'Team created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team' });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await query('SELECT * FROM teams');
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

export const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await query('SELECT * FROM teams WHERE id = ?', [id]);
    if (team.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(200).json(team[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
};

export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, coach_id } = req.body;
  try {
    const result = await query('UPDATE teams SET name = ?, coach_id = ? WHERE id = ?', [name, coach_id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(200).json({ message: 'Team updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team' });
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM teams WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
};
