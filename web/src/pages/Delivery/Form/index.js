import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { SaveButton, BackButton } from '~/components/Button';
import { SimpleInput } from '~/components/Form';
import HeaderForm from '~/components/HeaderForm';
import SelectAsync from '~/components/Select';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function DeliveryForm({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      if (id) {
        const response = await api.get(`/orders/${deliveryId}`);

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('recipient_id', {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        });
      }
    }
    loadInitialData(id);
  }, [id]);

  const customStylesSelectInput = {
    control: provided => ({
      ...provided,
      height: 45,
    }),
  };

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/orders/${id}`, {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });
        history.push('/deliveries');
        toast.success('Encomenda editada com sucesso!');
      } else {
        await api.post('/orders', {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });
        toast.success('Encomenda criada com sucesso!');
      }

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm title="Cadastro de encomendas">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <section>
            <SelectAsync
              name="recipient_id"
              optionType="recipients"
              placeholder="Entregadores"
              styles={customStylesSelectInput}
            />

            <SelectAsync
              name="deliveryman_id"
              optionType="couriers"
              placeholder="Entregadores"
              styles={customStylesSelectInput}
            />
          </section>
          <SimpleInput
            label="Nome do produto"
            name="product"
            type="text"
            placeholder="Nome do produto"
            onKeyPress={e =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </UnForm>
      </Content>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
