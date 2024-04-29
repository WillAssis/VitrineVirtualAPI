import Order from '../models/order.js';
import Product from '../models/product.js';

// Retorna todos os pedidos para o admin (deve ser verificado antes)
export const getOrders = async (req, res) => {
  try {
    // Retorna também os users no campo 'orderedBy'
    // TODO: remover as senhas
    const orders = await Order.find({})
      .populate('products.product')
      .populate('orderedBy')
      .exec();

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(418).json({ orders: null });
  }
};

// Retorna pedidos apenas do usuário
export const getUserOrders = async (req, res) => {
  const orderedBy = req.user._id;

  try {
    const orders = await Order.find({ orderedBy })
      .populate('products.product')
      .exec();

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(418).json({ orders: null });
  }
};

export const createOrder = async (req, res) => {
  const { products } = req.body;
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
        orderedBy: req.user._id,
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
