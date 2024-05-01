import express from 'express';
import checkForUser from '../middlewares/checkForUser.middleware.js';
import checkForAdmin from '../middlewares/checkForAdmin.middleware.js';
import validateOrder from '../middlewares/validateOrder.middleware.js';
import validateUpdateOrder from '../middlewares/validateUpdateOrder.middleware.js';
import {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controller/order.controller.js';

const router = express.Router();

router.get('/user/pedidos', checkForUser, getUserOrders);

router.get('/admin/pedidos', checkForAdmin, getOrders);

router.post('/pedido', checkForUser, validateOrder, createOrder);

router.put('/pedido/:id', checkForAdmin, validateUpdateOrder, updateOrder);

router.delete('/pedido/:id', checkForAdmin, deleteOrder);

export default router;
