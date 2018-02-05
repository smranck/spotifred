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

client.queryAsync = function queryAsync(...args) {
  return new Promise((resolve, reject) => {
    this.query(...args, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

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
    .then((data) => console.log(data.rows[0]));
};

// function to create query for requests for multiple songs
const createParamString = (arrayOfSongIDs) => {
  let arrayOfParams = [];
  for (let i = 0; i < arrayOfSongIDs.length; i += 1) {
    arrayOfParams.push(`id = $${i + 1}`);
  }

  return arrayOfParams.join(' or ');
};

// console.log(createParamString([1, 2, 3]));

// should be in songs
const getManyDetails = (arrayOfSongIDs) => {
  let query = `SELECT * FROM songs where (${createParamString(
    arrayOfSongIDs,
  )})`;
  // this will return an array of objects. Should narrows them down into what is wanted
  client
    .queryAsync(query, [...arrayOfSongIDs])
    .then((data) => console.log(data.rows));
};

// getManyDetails([1, 2]);

// should be in artists
// add a .catch
const addSong = (songDetails) => {
  let query =
    'INSERT INTO songs (title, length, artist, genre, file, playcount, album, track, art, bpm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  client
    .queryAsync(query, [
      songDetails.title,
      songDetails.length,
      songDetails.artist,
      songDetails.genre,
      songDetails.file,
      songDetails.playcount,
      songDetails.album,
      songDetails.track,
      songDetails.art,
      songDetails.bpm,
    ])
    .then((data) => console.log(data.rows[0]))
    .catch((err) => console.error(err));
};

// should be in artists
const removeSong = (songID) => {
  let query = `DELETE FROM songs WHERE id = ${songID}`;
  client.queryAsync(query).then(() => console.log('Deleted'));
};

// should be in update
const updatePlaycount = (songID, additionalPlays) => {
  let query = 'SELECT playcount FROM songs WHERE id = ($1)';
  client
    .query(query, [songID])
    .then((data) => data.rows[0].playcount)
    .then((data) => {
      client
        .query(
          `UPDATE songs SET playcount = ${data +
            additionalPlays} WHERE id = $1`,
          [songID],
        )
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

// getPlaycount(1, 1);

// should be in update
// got to figure out what this actually looks like with dave
// should figure out what to send back
const updatePopularity = async (songID, currentPopularity) => {
  let query = `UPDATE songs SET popularity = ${currentPopularity} WHERE id = ($1)`;
  client
    .query(query, [songID])
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

const copyToTable = (fromFile) => {
  let query = `copy songs from '${fromFile}' DELIMITERS ',' CSV;`;
  client
    .queryAsync(query)
    .then(() => console.log('Copied'))
    .catch((err) => {
      console.error(err);
    });
};

// create DB if not created yet
// if (process.env.INITIALIZEDB) {
initializeDB()
  .then()
  .catch((err) => console.error('error creating database tables, ', err.stack));
// }

module.exports = {
  getSongDetails,
  getManyDetails,
  addSong,
  removeSong,
  copyToTable,
  updatePlaycount,
};

// addSong({
//   title: 'asdf',
//   length: 12,
//   artist: 'asdf',
//   genre: 'asdf',
//   file: 'asdf',
//   playcount: 0,
//   album: 'asdf',
//   track: 12,
//   art: 'asdf',
//   bpm: 20,
// });

// getSongDetails(1234567);
// getPlayCount(1234567);
// getManyDetails([1234567]);
