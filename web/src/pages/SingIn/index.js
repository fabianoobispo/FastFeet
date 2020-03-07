import React from 'react';

import { Form } from '@unform/web';

import logo from '~/assets/logo.svg';
import { SimpleInput } from '~/components/Form';

export default function SingIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form>
        <SimpleInput
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <SimpleInput
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="*************"
        />
      </Form>
    </>
  );
}
