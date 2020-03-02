import * as Yup from 'yup';
import Deliveryman from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverymans = await Deliveryman.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist.' });
    }
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(4),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild.' });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman already exists.' });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(4),
      email: Yup.string().email(),
      avatar_id: Yup.number().min(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild.' });
    }

    if (!req.body) {
      return res.status(400).json({
        error: 'At least 1 atrribute should be updated',
      });
    }

    // verificar email
    const emailExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(401).json({
        error: 'E-mail already exists',
      });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exist.' });
    }

    await deliveryman.destroy();

    return res.status(200).json({ error: 'Deliveryman Deleted.' });
  }
}

export default new DeliveryManController();
