import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class RecipientController {
  async index(req, res) {
		const { q: recipientName, page = 1 } = req.query;

		const response = recipientName
			? await Recipient.findAll({
					where: {
						name: {
							[Op.iLike]: `${recipientName}%`,
						},
					},
					attributes: [
						'id',
						'name',
						'street',
						'number',
						'complement',
						'state',
						'city',
						'zip_code',
					],
			  })
			: await Recipient.findAll({
					attributes: [
						'id',
						'name',
						'street',
						'number',
						'complement',
						'state',
						'city',
						'zip_code',
					],
					limit: 5,
					offset: (page - 1) * 5,
			  });

		return res.json(response);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'id',
				'name',
				'street',
				'number',
				'complement',
				'state',
				'city',
        'zip_code',
      ]
    });

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

    const {name,street,number,complement,state,	city,	zip_code,	} = req.body;
    const { id} = await Recipient.create({
      name,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
      });

    return res.json({
			id,
			name,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
		});
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

    const { id } = req.params;

    const reripient = await Recipient.findByPk(id);

    if (!reripient) {
      return res.status(401).json({ error: `Recipient don't exist.` });
    }


		const {
			name,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
		} = req.body;

		await recipient.update({
			name,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
		});

		return res.json({});
  }

  async destroy(req, res) {
    const { id } = req.params;

    const repicient = await Recipient.findByPk(id);

    if (!repicient) {
      return res.status(401).json({ error: `Recipient don't exist.` });
    }

    const deliveries = await Delivery.findOne({
			where: {
				recipient_id: recipient.id,
				signature_id: null,
			},
    });
    if (deliveries) {
			return res
				.status(400)
				.json({ error: 'This Recipient still has an delivery to receive' });
    }

    await repicient.destroy();

  	return res.json({});
  }
}

export default new RecipientController();
