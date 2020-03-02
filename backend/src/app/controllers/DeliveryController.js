import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/DeliveryMan';
import File from '../models/File';
import NewDelivery from '../jobs/NewDelivery';
import Queue from '../../lib/Queue';

class DeliveryController {
  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'zip_code', 'number', 'complement'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'This recipient does not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: 'This deliveryman does not exists' });
    }

    const { id } = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'zip_code', 'number', 'complement'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    await Queue.add(NewDelivery.key, {
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    if (!req.body) {
      return res.status(400).json({
        error: 'At least 1 atrribute should be updated',
      });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      res.status(400).json({ error: 'Delivery not found' });
    }

    const {
      id,
      product,
      recipient_id,
      signature_id,
      deliveryman_id,
      start_date,
      end_date,
      canceled_at,
    } = await delivery.update(req.body);
    return res.json({
      id,
      product,
      recipient_id,
      signature_id,
      deliveryman_id,
      start_date,
      end_date,
      canceled_at,
    });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ msg: 'Deleted with success' });
  }
}

export default new DeliveryController();
