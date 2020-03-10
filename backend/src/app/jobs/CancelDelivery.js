import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { deliveryman, product, recipient, description} = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancelDelivery',
      context: {
        description,
				deliveryman: deliveryman.name,
				product,
				recipient: recipient.name,
				city: recipient.city,
				state: recipient.state,
				street: recipient.street,
				number: recipient.number,
				zip_code: recipient.zip_code,
      },
    });
  }
}

export default new NewDelivery();
