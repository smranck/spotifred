const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

console.log('In Index.js');
const client = new Client({
  connectionString: 'psql://home:@localhost/capstone',
});

client
  .connect()
  .then()
  .catch((err) =>
    console.error('error connecting to postgres db, ', err.stack),
  );

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });
const initializeDB = () => {
  // initialize tables by reading schema files and running as query
  console.log('initializeDB');
  const schemas = ['/schema/songs.sql'];
  return Promise.all(
    schemas.map((schema) =>
      new Promise((resolve, reject) => {
        fs.readFile(
          path.join(__dirname, schema),
          'utf8',
          (err, data) => (err ? reject(err) : resolve(data)),
        );
      }).then((data) => client.query(data)),
    ),
  );
};

// gonna have to do more than console log eventually
// gonna want to async await I would think
// should be in songs
const getSongDetails = (songID) => {
  client
    .query('SELECT * FROM songs where id = ($1)', [songID])
    .then((data) => console.log(data));
};

// should be in songs
const getManyDetails = (songArray) => {
  console.log('Gotta make this do actual things');
  return songArray.map((songID) => console.log(songID));
};

// should be in artists
const addSong = () => {};

// should be in artists
const removeSong = () => {};

// should be in update
const updatePlayCount = () => {};

// should be in update
const updatePopularity = () => {};

// should be in update
const updateSearchCount = () => {};

// create DB if not created yet
// if (process.env.INITIALIZEDB) {
//   initializeDB()
//     .then()
//     .catch(err => console.error('error creating database tables, ', err.stack));
// }

module.exports = {};
