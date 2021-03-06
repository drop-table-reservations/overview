const faker = require('faker');
const fs = require('fs');
const restaurants = require('./restaurants.json');

let counter = 0;

const randomNumber = (max, min = 0) => Math.ceil(Math.random() * max) + min;

const createMenuEntry = (num) => {
  const entries = [];
  for (let i = 0; i < num; i += 1) {
    entries.push([faker.commerce.productName(), `$${randomNumber(50)}`]);
  }

  return entries;
};

class Menu {
  constructor() {
    this.title = `${faker.company.catchPhraseAdjective()} Menu`;
    this.menu = createMenuEntry(randomNumber(40, 20));
  }
}

const generateMenu = (num) => {
  const menus = [];
  for (let i = 0; i < num; i += 1) {
    menus.push(new Menu());
  }

  return menus;
};
const overview = restaurants.restaurants.map((restaurant) => {
  const obj = {
    _id: restaurant.id,
    name: restaurant.name,
    header: {
      reviewAvg: randomNumber(5),
      reviews: randomNumber(1000),
      price: `$${randomNumber(10)} - $${randomNumber(50, 10)}`,
      cuisines: faker.commerce.productAdjective(),
    },
    description: faker.lorem.paragraphs(),
    privateDining: 'view details',
    diningStyle: faker.company.catchPhraseAdjective(),
    cuisines: faker.commerce.productAdjective(),
    hoursOfOperation: `${faker.date.weekday()}s - ${faker.date.weekday()}s 9:00am - 8:00pm`,
    phoneNumber: faker.phone.phoneNumberFormat(),
    website: faker.internet.url(),
    paymentOptions: faker.lorem.words(),
    dressCode: faker.company.bsAdjective(),
    executiveChef: faker.name.findName(),
    catering: faker.lorem.sentence(),
    openGoogleMaps: `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`,
    Neighborhood: faker.address.country(),
    crossStreet: `${faker.address.streetName()} + ${faker.address.streetName()}`,
    parkingDetails: faker.lorem.sentence(),
    publicTransit: faker.lorem.sentence(),
    specialEvents: faker.lorem.sentences(),
    giftCards: faker.random.boolean(),
    entertainment: faker.lorem.sentences(),
    additional: faker.lorem.sentence(),
    menus: generateMenu(randomNumber(6)),
  };

  if (counter % 3 === 0) {
    obj.giftCards = null;
  } else if (counter % 3 === 1) {
    obj.entertainment = null;
  } else {
    obj.specialEvents = null;
  }

  counter += 1;
  return obj;
});

fs.writeFile('seededData.json', JSON.stringify(overview), 'utf8', (err) => {
  if (err) throw err;
});
