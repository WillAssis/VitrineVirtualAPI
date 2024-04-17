import jwt from 'jsonwebtoken';

const secret = '8fbgj396378t3h53t893';

// Verifica se o user está logado para prosseguir
const checkForUser = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const user = jwt.verify(token, secret);
    if (user) {
      next();
    } else {
      res.status(401).json({ error: 'Não autorizado' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Não autenticado' });
  }
};

export default checkForUser;
