import { FastifyInstance } from 'fastify';
import { verifyJWT } from './middlewares/verify-jwt';
import { register } from './controllers/register';

import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { listAllServices, createService, editService, deleteService } from './controllers/service';
import { listAllProducts, createProduct, editProduct, deleteProduct } from './controllers/product';
import { createOrder, deleteOrder, listAllOrders } from './controllers/order';
import { createStatus, listAllStatus } from './controllers/status';
import { createCategory, deleteCategory, editCategory, listAllCategories } from './controllers/category';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Services
  app.post('/services', createService);
  app.get('/services', listAllServices);
  app.put('/services/:id', editService);
  app.delete('/services/:id', deleteService);

  // Products
  app.post('/products', createProduct);
  app.get('/products', listAllProducts);
  app.put('/products/:id', editProduct);
  app.delete('/products/:id', deleteProduct);

  // Orders
  app.post('/orders', createOrder)
  app.get('/orders', listAllOrders)
  app.delete('/orders/:id', deleteOrder);

  //Status
  app.post('/status', createStatus)
  app.get('/status', listAllStatus)

  //Category
  app.post('/categories', createCategory);
  app.get('/categories', listAllCategories);
  app.put('/categories/:id', editCategory);
  app.delete('/categories/:id', deleteCategory);

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);

  // Only admin example
  // app.get("/admininfo",{onRequest:[verifyUserRole("ADMIN")]}, adminController)
}
