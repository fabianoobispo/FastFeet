import * as Yup from 'yup';

import Repicient from '../models/Repicient';

class RepicientsController {
  async index(req, res) {
    const repicientes = await Repicient.findAll();

    return res.json(repicientes);
  }

  async show(req, res) {
    const repicient = await Repicient.findByPk(req.params.id);

    if (!repicient) {
      return res.status(401).json({ error: `Repicient don't exist.` });
    }

    return res.json(repicient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number()
        .required()
        .positive(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      complemento: Yup.string(),
      cep: Yup.string()
        .required()
        .length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verification faild.' });
    }

    const repicient = await Repicient.create(req.body);

    return res.json(repicient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number().positive(),
      estado: Yup.string(),
      cidade: Yup.string(),
      complemento: Yup.string(),
      cep: Yup.string().length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verification faild.' });
    }

    const repicient = await Repicient.findByPk(req.body.id);

    if (!repicient) {
      return res.status(401).json({ error: `Repicient don't exist.` });
    }
    const repicientUpdated = await repicient.update(req.body);

    return res.json(repicientUpdated);
  }

  async delete(req, res) {
    const repicient = await Repicient.findByPk(req.params.id);

    if (!repicient) {
      return res.status(401).json({ error: `Repicient don't exist.` });
    }

    await repicient.destroy();

    return res.status(200).json({ message: `Repicient deleted.` });
  }
}

export default new RepicientsController();
