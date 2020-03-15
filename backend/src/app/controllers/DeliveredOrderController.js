import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import Orders from '../models/Orders';
import Deliveryman from '../models/DeliveryMan';
import Files from '../models/Files';

class DeliveredOrderController {
  async index(req, res) {
    /** query to search for undelivered and undelivered orders */
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman doest not exists.' });
    }

    const orders = await Orders.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.not]: null,
        },
      },
      order: [['id', 'DESC']],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'street', 'number', 'country', 'city'],
        },
        {
          model: Files,
          as: 'signature',
          attributes: ['url', 'path'],
        },
      ],
    });
    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      orderId: Yup.string().required(),
      signature_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { orderId, signature_id } = req.body;
    const order = await Orders.findByPk(orderId);

    if (!orderId || !signature_id) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const end_date = new Date();

    order.update({ end_date, signature_id });
    order.save();

    return res.json(order);
  }
}

export default new DeliveredOrderController();
