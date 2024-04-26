const validateQuantities = (quantities) => {
  for (const quantity of quantities) {
    if (!Number.isInteger(quantity)) return false;
  }

  return true;
};

const validateOrder = async (req, res, next) => {
  const { products } = req.body;
  const quantities = products.map((product) => Number(product.quantity));

  try {
    const isQuantitiesValids = validateQuantities(quantities);

    if (isQuantitiesValids) {
      next();
    } else {
      res
        .status(400)
        .json({ error: 'Produtos contém quantidades inválidas', order: null });
    }
  } catch (error) {
    console.error(error);
    res.status(418).json({ error: 'Erro ao gerar pedido', order: null });
  }
};

export default validateOrder;
