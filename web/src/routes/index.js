import React from 'react';
import { Switch } from 'react-router-dom';

import SingIn from '~/pages/SingIn';
import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';
import Deliverymen from '~/pages/Deliverymen';
import DeliverymenForm from '~/pages/Deliverymen/Form';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/form" exact component={DeliveryForm} isPrivate />
      <Route
        path="/deliveries/form/:id"
        exact
        component={DeliveryForm}
        isPrivate
      />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/form"
        exact
        component={DeliverymenForm}
        isPrivate
      />
      <Route
        path="/deliverymen/form/:id"
        exact
        component={DeliverymenForm}
        isPrivate
      />
    </Switch>
  );
}