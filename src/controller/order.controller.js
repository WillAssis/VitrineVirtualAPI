import Order from '../models/order.js';
import Product from '../models/product.js';

export const createOrder = async (req, res) => {
  const { products } = req.body;
  const orderedBy = req.user._id;
  const ids = products.map((product) => product._id);

  try {
    const matchProducts = await Product.find({}).where('_id').in(ids).exec();

    // Checa se todos os produtos pedidos estão no banco de dados
    if (products.length !== matchProducts.length) {
      res
        .status(400)
        .json({ error: 'Pedido contém produtos inválidos', order: null });
    } else {
      const orderedProducts = products.map(({ _id, quantity }) => {
        return { product: _id, quantity };
      });
      const order = await Order.create({
        orderedBy,
        products: orderedProducts,
      });

      res.status(200).json({ error: true, order });
    }
  } catch (error) {
    // Em '.where('_id').in(ids)' pode-se gerar erros com ids mal formatados e/ou modificados intencionalmente
    if (error.name === 'CastError') {
      res
        .status(400)
        .json({ error: 'Pedido contém produtos inválidos', order: null });
    } else {
      console.error(error);
      res.status(418).json({ error: 'Erro ao gerar pedido', order: null });
    }
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(418).json({ success: false });
  }
};
