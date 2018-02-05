const db = require('../database/index.js');
const faker = require('Faker');

const genres = ['Jazz', 'Pop', 'Rock', 'Country', 'Classical'];

const makeFakeSong = (songId) => {
  let fakeSong = {
    id: songId,
    title: faker.Lorem.words().join(' '),
    length: 30 + Math.floor(Math.random() * 270),
    artist: `${faker.Name.firstName()} ${faker.Name.lastName()}`,
    genre: genres[Math.floor(Math.random() * genres.length)],
    file: `${faker.Internet.domainName()}/${faker.Lorem.words().join('')}`,
    album: faker.Lorem.words().join(' '),
    track: Math.ceil(Math.random() * 15),
    art: faker.Image.imageUrl(),
    bpm: Math.floor(50 + Math.random() * 125),
    popularity: 0,
    playcount: 0,
  };
  return fakeSong;
};

module.exports = {
  makeFakeSong,
};
