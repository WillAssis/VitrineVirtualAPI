/**
 * Verifica e modifica req.query que atualmente suporta os parametros:
 *   -> page: número da página
 *   -> search: termo de pesquisa
 */
const parseQuery = (req, res, next) => {
  const { page, orderBy, search } = req.query;
  let isQueryValid = true;

  // Página deve ser número inteiro e maior que zero
  if (page) {
    const pageAsNumber = parseInt(page);

    if (Number.isInteger(pageAsNumber) && page > 0) {
      req.query.page = pageAsNumber;
    } else {
      isQueryValid = false;
    }
  } else {
    req.query.page = 1;
  }

  if (isQueryValid) {
    next();
  } else {
    res.status(400);
  }
};

export default parseQuery;
