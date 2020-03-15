import React from 'react';

import PropTypes from 'prop-types';

import { Container, MoreConainer } from './styles';

export default function OrderItem({ data }) {
  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.recipient.name}</small>
      <small>{data.product}</small>
      <small>{data.recipient.city}</small>
      <small>{data.recipient.state}</small>
    </Container>
  );
}

OrderItem.propTypes = {
  updateOrders: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
