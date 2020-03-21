import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanOrderController {
  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;
    const { delivered } = req.query;
    const atualPage = page || '1';

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'deliveryman does not exists.' });
    }

    if (delivered === 'false') {
      const orders = await Order.findAndCountAll({
        where: { deliveryman_id: id, end_date: null, canceled_at: null },
        include: [
          {
            model: File,
            as: 'signature',
            attributes: ['name', 'path', 'url'],
          },
          {
            model: Recipient,
            as: 'recipient',
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
        ],
        order: [['id', 'ASC']],
        limit: 5,
        offset: (atualPage - 1) * 5,
      });

      return res.json(orders);
    }

    const orders = await Order.findAndCountAll({
      where: {
        deliveryman_id: id,
        [Op.or]: [
          { end_date: { [Op.ne]: null } },
          { canceled_at: { [Op.ne]: null } },
        ],
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [['id', 'ASC']],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });

    return res.json(orders);
  }

  async update(req, res) {
    const { id, orderId } = req.params;

    const { endDelivery } = req.query;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'deliveryman does not exists.' });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(400).json({ error: 'delivery does not exists.' });
    }

    const date = new Date();

    const ordersByDay = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (endDelivery === 'false' && ordersByDay.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Exceeded 5 withdrawals' });
    }

    await order.update(req.body);

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await Order.findByPk(orderId);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });

  }
}

export default new DeliverymanOrderController();
