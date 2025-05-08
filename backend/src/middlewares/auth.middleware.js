import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable for production

// Middleware per l'autenticazione tramite JWT
export const authenticate = (req, res, next) => {
  // Verifica se l'header di autorizzazione è presente
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verifica e decodifica il token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Aggiungi i dati dell'utente decodificato alla richiesta
    next();  // Vai alla route successiva
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
};
