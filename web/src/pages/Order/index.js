import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { parseISO, format } from 'date-fns';

import { SearchInput } from '~/components/Form';
import { IconButton } from '~/components/Button';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import history from '~/services/history';

import OrderItem from './OrderItem';
import { Container, Content, Grid, Button } from './styles';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  function formatDates(data) {
    return data.map(order => ({
      ...order,
      start_dateFormated: order.start_date
        ? format(parseISO(order.start_date), 'dd/MM/yyyy')
        : null,
      end_dateFormated: order.end_date
        ? format(parseISO(order.end_date), 'dd/MM/yyyy')
        : null,
    }));
  }

  async function handleSearchOrder(e) {
    setPage(1);
    const response = await api.get('/orders', {
      params: {
        q: e.target.value,
        page,
      },
    });

    const data = formatDates(response.data);

    setOrders(data);
  }

  async function loadOrders() {
    const response = await api.get('/orders', {
      params: {
        page,
      },
    });

    const data = formatDates(response.data);

    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, [page]); //eslint-disable-line

  return (
    <Container>
      <Content>
        <HeaderList title="Gerenciando pedidos">
          <SearchInput
            onChange={handleSearchOrder}
            type="text"
            placeholder="Buscar por pedido"
          />
          <IconButton
            Icon={MdAdd}
            title="CADASTRAR"
            action={() => history.push('/order/form')}
            type="button"
          />
        </HeaderList>

        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Destinatário</strong>
            <strong>Produto</strong>
            <strong>Cidade</strong>
            <strong>Estado</strong>
            <strong>Status</strong>
            <strong>Ações</strong>
          </section>
          {orders.map(order => (
            <OrderItem updateOrder={loadOrders} key={order.id} data={order} />
          ))}
        </Grid>
        <section>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            voltar
          </Button>
          <Button
            disabled={orders.length < 5}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            proximo
          </Button>
        </section>
      </Content>
    </Container>
  );
}
