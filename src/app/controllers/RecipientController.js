import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: `Recipient don't exist.` });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verification faild.' });
    }

    const { id, name, zip_code, number, complement } = await Recipient.create(
      req.body
    );

    return res.json({ id, name, zip_code, number, complement });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verification faild.' });
    }

    const reripient = await Recipient.findByPk(req.params.id);

    if (!reripient) {
      return res.status(401).json({ error: `Recipient don't exist.` });
    }

    if (!req.body) {
      return res.status(400).json({
        error: 'At least 1 atrribute should be updated',
      });
    }

    const recipientUpdated = await Recipient.findByPk(req.params.id);

    if (!recipientUpdated) {
      res.status(400).json({ error: 'Recipient not fond' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await recipientUpdated.update(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async delete(req, res) {
    const repicient = await Recipient.findByPk(req.params.id);

    if (!repicient) {
      return res.status(401).json({ error: `Recipient don't exist.` });
    }

    await repicient.destroy();

    return res.status(200).json({ message: `Recipient deleted.` });
  }
}

export default new RecipientController();
