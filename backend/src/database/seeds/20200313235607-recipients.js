// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

faker.locale = 'pt_BR';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          city: faker.address.city(),
          postcode: faker.address.zipCode(),
          state: faker.address.state(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          city: faker.address.city(),
          postcode: faker.address.zipCode(),
          state: faker.address.state(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          city: faker.address.city(),
          postcode: faker.address.zipCode(),
          state: faker.address.state(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          city: faker.address.city(),
          postcode: faker.address.zipCode(),
          state: faker.address.state(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          city: faker.address.city(),
          postcode: faker.address.zipCode(),
          state: faker.address.state(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: faker.name.findName(),
          street: faker.address.streetName(),
          number: faker.random.number(),
          city: faker.address.city(),
          postcode: faker.address.zipCode(),
          state: faker.address.state(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('recipients', null, {});
  },
};
