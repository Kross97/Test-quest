export const sortingSpans = [{
  value: {
    asc: 'numberAscending',
    desc: 'numberDesc',
  },
  blokStyle: 'sort-block-number',
  labelStyle: 'sort-label',
  text: 'Номер',
},
{
  value: {
    asc: 'dataAscending',
    desc: 'dataDesc',
  },
  blokStyle: 'sort-block',
  labelStyle: 'sort-label',
  text: 'Создано',
},
{
  value: {
    asc: 'textAscending',
    desc: 'textDesc',
  },
  blokStyle: 'sort-block',
  labelStyle: 'sort-text',
  text: 'Обьявление',
},
{
  value: {
    asc: 'ratingAscending',
    desc: 'ratingDesc',
  },
  blokStyle: 'sort-block-rating',
  labelStyle: 'sort-rating',
  text: 'Рейтинг',
},
{
  value: {
    asc: 'userAscending',
    desc: 'userDesc',
  },
  blokStyle: 'sort-block-user',
  labelStyle: 'sort-label',
  text: 'Пользователь',
}];

export const buttonsQuantityAndChannels = [{ type: 'quantity', value: 10, text: '10' }, { type: 'quantity', value: 50, text: '50' }, { type: 'quantity', value: 100, text: '100' },
  {
    type: 'channel',
    first: true,
    value: 1,
    text: '1',
  }, { type: 'channel', value: 2, text: '2' }, { type: 'channel', value: 3, text: '3' }, { type: 'channel', value: 4, text: '4' }, { type: 'channel', value: 5, text: '5' }, { type: 'channel', value: 6, text: '6' }];

export const inputsModalAddUser = [{ type: 'name', placeholder: 'Enter your name' }, { type: 'lastName', placeholder: 'Enter last name' }];
