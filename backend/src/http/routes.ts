import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJWT } from './middlewares/verify-jwt';
import { listAllServices, createService, editService, deleteService } from './controllers/service';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Services
  app.post('/services', createService);
  app.get('/services', listAllServices);
  app.put('/services/:id', editService);
  app.delete('/services/:id', deleteService);

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);

  // Only admin example
  // app.get("/admininfo",{onRequest:[verifyUserRole("ADMIN")]}, adminController)
}
