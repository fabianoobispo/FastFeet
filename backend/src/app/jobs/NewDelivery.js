import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    const { deliveryman, product, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova Entrega',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
				product,
				recipient: recipient.name,
				city: recipient.city,
				state: recipient.state,
				street: recipient.street,
				number: recipient.number,
        zip_code: recipient.zip_code,
      }
    });
  }
}

export default new NewDelivery();
