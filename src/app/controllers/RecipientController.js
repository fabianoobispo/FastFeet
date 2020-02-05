import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async show(request, response) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(request.params)))
      return response.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(request.params.id, {
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
      return response.status(400).json({ error: 'Recipient not found' });

    return response.json(recipient);
  }

  async store(request, response) {
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

    if (!(await schema.isValid(request.body)))
      return response.status(400).json({ error: 'Validation fails' });

    const { zipcode } = request.body;

    const checkRecipientExists = await Recipient.findOne({
      where: { zipcode },
    });

    if (checkRecipientExists)
      return response.status(400).json({ error: 'Recipient already exists' });

    const recipient = await Recipient.create(request.body);

    return response.json(recipient);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      state: Yup.string(),
      complement: Yup.string(),
      zipcode: Yup.string().length(8),
      city: Yup.string(),
      house: Yup.number().positive(),
    });

    if (!(await schema.isValid(request.body)))
      return response.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient)
      return response.status(400).json({ error: 'Recipient not found' });

    const {
      name,
      street,
      complement,
      zipcode,
      city,
      state,
      house,
    } = await recipient.update(request.body);

    return response.json({
      id: request.params.id,
      name,
      street,
      complement,
      zipcode,
      city,
      state,
      house,
    });
  }

  async destroy(request, response) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(request.params)))
      return response.status(400).json({ error: 'Validation fails' });

    const recipient = await Recipient.findByPk(request.params.id);

    if (!recipient)
      return response.status(400).json({ error: 'Recipient not found' });

    recipient.destroy();

    return response.send();
  }
}

export default new RecipientController();
