const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

const client = new Client({
  connectionString: 'psql://home:@localhost/capstone',
});

client
  .connect()
  .then(() => console.log('Connected to database'))
  .catch((err) =>
    console.error('error connecting to postgres db, ', err.stack),
  );

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });
const initializeDB = () => {
  // initialize tables by reading schema files and running as query
  // if more tables needed, can add schema in this array
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
const addSong = (songDetails) => {};

// should be in artists
const removeSong = (songID) => {};

// should be in update
const updatePlayCount = (songID, additionalPlays) => {};

// should be in update
const updatePopularity = (songID, currentPopularity) => {};

// should be in update
const updateSearchCount = (songID, additionalSearches) => {};

// create DB if not created yet
// if (process.env.INITIALIZEDB) {
//   initializeDB()
//     .then()
//     .catch(err => console.error('error creating database tables, ', err.stack));
// }

module.exports = {
  getSongDetails,
  getManyDetails,
  addSong,
  removeSong,
};
