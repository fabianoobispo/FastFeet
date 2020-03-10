import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryPendingController from './app/controllers/DeliveryPendingController';
import DeliveryDeliveredController from './app/controllers/DeliveryDeliveredController';
import DeliveryWithDrawController from './app/controllers/DeliveryWithDrawController';
import DeliveryFinishController from './app/controllers/DeliveryFinishController';
import DeliveryProblem from './app/controllers/DeliveryProblemController';

import FileController from './app/controllers/FileController';

import auth from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// rotas sem autenticação
routes.post('/sessions', SessionController.store);

// retirada encomenda
routes.get('/deliveryman/:id', DeliveryPendingController.index);
routes.get('/deliveryman/:id/deliveries', DeliveryDeliveredController.index);
routes.put(
	'/deliveryman/:deliverymanId/delivery/:deliveryId',
	DeliveryWithDrawController.update
);
routes.put(
	'/deliveryman/:deliverymanId/delivery/:deliveryId/finish',
	DeliveryFinishController.update
);

routes.post('/delivery/:id/problems', DeliveryProblem.store);

routes.get('/deliverymen/:id', DeliverymanController.show);

// rotas com autenticação
routes.use(auth);

// entregadores
routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.destroy);

routes.get('/deliveries/problems', DeliveryProblem.index);
routes.get('/delivery/:id/problems', DeliveryProblem.show);

// destinatarios
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.delete('/recipients/:id', RecipientController.destroy);
// fotos
routes.post('/files', upload.single('file'), FileController.store);


// Rotas de encomendas
routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

routes.delete('/problem/:id/cancel-delivery', DeliveryProblem.destroy);



export default routes;
