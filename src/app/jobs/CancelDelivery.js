import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { updatedDelivery, problem } = data;

    await Mail.sendMail({
      to: `${updatedDelivery.deliveryman.name} <${updatedDelivery.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancelDelivery',
      context: {
        deliveryman: updatedDelivery.deliveryman.name,
        product: updatedDelivery.product,
        name: updatedDelivery.recipient.name,
        cep: updatedDelivery.recipient.zip_code,
        number: updatedDelivery.recipient.number,
        complement: updatedDelivery.recipient.complement
          ? updatedDelivery.recipient.complement
          : 'Sem complemento',
        problem: problem.description,
      },
    });
  }
}

export default new NewDelivery();
