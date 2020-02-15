import { startOfHour, format, startOfDay, endOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/DeliveryMan';

class ScheduleController {
  async index(req, res) {
    const { deliverymanId } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliverymanId);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: null,
        canceled_at: null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'zip_code', 'number', 'complement'],
        },
      ],
    });

    if (deliveries.length === 0) {
      return res.json({ message: 'No deliveries for this deliveryman' });
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }
    if (delivery.deliveryman_id !== Number(deliverymanId)) {
      return res
        .status(401)
        .json({ error: 'You can only edit deliveries that you own' });
    }
    if (delivery.start_date) {
      return res
        .status(401)
        .json({ error: 'This delivery was already withdrawn' });
    }
    const now = new Date();
    const hourStart = startOfHour(now);
    const formattedDate = format(hourStart, "yyyy-MM-dd'T'HH:mm:ssxxx", {
      locale: pt,
    });

    const deliveriesWithdrawn = await Delivery.findAndCountAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(now.getTime()), endOfDay(now.getTime())],
        },
        deliveryman_id: deliverymanId,
      },
    });

    if (deliveriesWithdrawn.count > 4) {
      return res
        .status(401)
        .json({ error: 'You can only widthdraw 5 deliveries per day' });
    }

    const { id, product, end_date, start_date } = await delivery.update({
      start_date: formattedDate,
    });

    return res.json({
      id,
      product,
      start_date,
      end_date,
    });
  }
}

export default new ScheduleController();
