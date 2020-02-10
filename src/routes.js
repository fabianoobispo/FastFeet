import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';

import FileController from './app/controllers/FileController';

import auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// rotas sem autenticação
routes.post('/sessions', SessionController.store);

routes.use(auth);

// routes.get('/problems', DeliveryProblemController.index);
// routes.get('/problems/:id', DeliveryProblemController.show);
// routes.put('/problems/:id/cancel-delivery', DeliveryProblemController.update);

// routes.get('/deliveries', DeliveryController.index);
// routes.post('/deliveries', DeliveryController.store);
// routes.put('/deliveries/:id', DeliveryController.update);
// routes.delete('/deliveries/:id', DeliveryController.destroy);

routes.get('/deliverymans', DeliveryManController.index);
routes.post('/deliverymans', DeliveryManController.store);
// routes.put('/deliverymans', DeliveryManController.update);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

routes.get('/recipient', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
