const validateName = (value) => {
  if (value === '') return 'Nome do produto é obrigatório';
  return '';
};

const validateDescription = (value) => {
  if (value === '') return 'Descrição do produto é obrigatória';
  return '';
};

const validatePrice = (value) => {
  const price = Number(value);
  const isNumber = !Number.isNaN(price) && Number.isFinite(price);

  if (!isNumber) return 'Valor inválido, insira um número';
  if (price < 0.01) return 'Preço deve ser maior que R$ 0.01';
  return '';
};

const validateProduct = async (req, res, next) => {
  const { name, description, price } = req.body;
  const images = req.files.map((img) => img.filename);
  const nameError = validateName(name);
  const descriptionError = validateDescription(description);
  const priceError = validatePrice(price);
  const isValid = !nameError && !priceError && !descriptionError;

  if (isValid) {
    next();
  } else {
    images.forEach(deleteImage); // Delete images if fail
    res.status(418).json({
      errors: { nameError, descriptionError, priceError },
    });
  }
};

export default validateProduct;
