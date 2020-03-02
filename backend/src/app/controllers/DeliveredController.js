import { Op } from 'sequelize';
import { startOfHour, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/DeliveryMan';
import File from '../models/File';

class DeliveriedController {
  async index(req, res) {
    const { deliverymanId } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliverymanId);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const deliveried = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: { [Op.not]: null },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'zip_code', 'number', 'complement'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (deliveried.length === 0) {
      return res.json({
        message: 'You did not deliveried any deliveries yet',
      });
    }

    return res.json(deliveried);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Signature ID is required',
      });
    }
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
    if (!delivery.start_date) {
      return res
        .status(401)
        .json({ error: 'You did not withdraw this delivery yet' });
    }
    if (delivery.end_date) {
      return res
        .status(401)
        .json({ error: 'You have already finished this delivery' });
    }

    const { signature_id } = req.body;
    const now = new Date();
    const hourStart = startOfHour(now);
    const formattedDate = format(hourStart, "yyyy-MM-dd'T'HH:mm:ssxxx", {
      locale: pt,
    });

    const { id, product, start_date, end_date } = await delivery.update({
      end_date: formattedDate,
      signature_id,
    });

    return res.json({
      id,
      product,
      start_date,
      end_date,
      signature_id,
    });
  }
}
export default new DeliveriedController();
