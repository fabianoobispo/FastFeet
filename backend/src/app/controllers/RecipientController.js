import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      number,
      city,
      postcode,
      state,
      complement,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      city,
      postcode,
      state,
      complement,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      city: Yup.string(),
      postcode: Yup.string(),
      state: Yup.string(),
      complement: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'This recipient does not exist' });
    }

    const {
      name,
      street,
      number,
      city,
      postcode,
      state,
      complement,
    } =  await recipient.update(req.body);


    return res.json({
      name,
      street,
      number,
      city,
      postcode,
      state,
      complement,
    });
  }

  async index(req, res) {
    const { id } = req.params;
    const { page, q } = req.query;
    const atualPage = page || '1';
    const name = q || '';

    if (id) {
      const recipient = await Recipient.findByPk(id);
      return res.json(recipient);
    }

    const recipients = await Recipient.findAndCountAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      order: [['name', 'ASC']],
      limit: 5,
      offset: (atualPage - 1) * 5,
    });
    return res.json(recipients);
  }

  async delete(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }
    const hasOrder = await Order.findOne({
      where: {
        recipient_id: id,
      },
    });

    if (hasOrder) {
      return res.status(400).json({
        error: 'This recipient has orders, you cannot delete.',
      });
    }

    await Recipient.destroy({
      where: {
        id,
      },
    });

    return res.json({ success: 'The recipient has been successfully deleted!' });
  }
  }


export default new RecipientController();
