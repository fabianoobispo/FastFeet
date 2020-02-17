import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import ScheduleController from './app/controllers/ScheduleController';
import DeliveredController from './app/controllers/DeliveredController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import FileController from './app/controllers/FileController';

import auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// rotas sem autenticação
routes.post('/sessions', SessionController.store);

// retirada encomenda
routes.get('/deliverymans/:deliverymanId/deliveries', ScheduleController.index);
routes.put(
  '/deliverymans/:deliverymanId/deliveries/:deliveryId',
  ScheduleController.update
);

// Entrega
routes.get(
  '/deliverymans/:deliverymanId/deliveried',
  DeliveredController.index
);
routes.put(
  '/deliverymans/:deliverymanId/deliveried/:deliveryId',
  DeliveredController.update
);

// Problemas
routes.post(
  '/deliveries/:deliveryId/problems',
  DeliveryProblemsController.store
);

// rotas com autenticação
routes.use(auth);

// entregadores
routes.get('/deliverymans', DeliveryManController.index);
routes.get('/deliverymans/:id', DeliveryManController.show);
routes.post('/deliverymans', DeliveryManController.store);
routes.put('/deliverymans/:id', DeliveryManController.update);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

// destinatarios
routes.get('/recipient', RecipientController.index);
routes.get('/recipient/:id', RecipientController.show);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);
// fotos
routes.post('/files', upload.single('file'), FileController.store);

// criar entrega
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

// Ver problemas
routes.get('/problems', DeliveryProblemsController.index);
routes.get('/problems/:deliveryId', DeliveryProblemsController.show);
routes.delete('/problems/:problemId', DeliveryProblemsController.delete);

export default routes;
