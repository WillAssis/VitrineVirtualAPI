const VALID_VALUES = ['pendente', 'aceito', 'entregue', 'cancelado'];

// Checa se status tem qualquer um dos 4 valores permitidos
const validateUpdateOrder = (req, res, next) => {
  const status = req.body.status.toLowerCase();
  const isValid = VALID_VALUES.includes(status);

  if (isValid) {
    next();
  } else {
    res.status(400).json({ error: 'Valor inválido para status do pedido' });
  }
};

export default validateUpdateOrder;
