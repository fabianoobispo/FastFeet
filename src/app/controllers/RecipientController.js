import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'street',
        'complement',
        'house',
        'zipcode',
        'city',
      ],
    });

    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      state: Yup.string().required(),
      complement: Yup.string().required(),
      zipcode: Yup.string()
        .required()
        .length(8),
      city: Yup.string().required(),
      house: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { house } = req.body;

    const checkRecipientExists = await Recipient.findOne({
      where: { house },
    });

    if (checkRecipientExists)
      return res.status(400).json({ error: 'Recipient already exists' });

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      state: Yup.string(),
      complement: Yup.string(),
      zipcode: Yup.string().length(8),
      city: Yup.string(),
      house: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(req.params.id);

   

    if (!recipient)
      return res.status(400).json({ error: 'Recipient not found' });

    const {
      name,
      street,
      complement,
      zipcode,
      city,
      state,
      house,
    } = await recipient.update(req.body);

    return res.json({
      id: req.params.id,
      name,
      street,
      complement,
      zipcode,
      city,
      state,
      house,
    });
  }

}

export default new RecipientController();
