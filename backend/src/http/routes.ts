import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJWT } from './middlewares/verify-jwt';
import { listAll, create } from './controllers/service';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/services', listAll);
  app.post('/services', create);

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);

  // Only admin example
  // app.get("/admininfo",{onRequest:[verifyUserRole("ADMIN")]}, adminController)
}
