import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Files from '../app/models/Files';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/DeliveryMan';
import Orders from '../app/Models/Orders';
import DeliveryProblem from '../app/Models/DeliveryProblem';

const models = [User, Files, Recipient, Deliveryman, Orders, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

// para criar migration nova e yarn sequelize migration:generate --name=create-delivery-problems
