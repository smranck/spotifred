const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const create = require('./creation.js');
// const db = require('../database/index.js');

const csvWriter = createCsvWriter({
  path: './data2.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'title', title: 'title' },
    { id: 'length', title: 'length' },
    { id: 'artist', title: 'artist' },
    { id: 'genre', title: 'genre' },
    { id: 'file', title: 'file' },
    { id: 'album', title: 'album' },
    { id: 'track', title: 'track' },
    { id: 'art', title: 'art' },
    { id: 'bpm', title: 'bpm' },
    { id: 'popularity', title: 'popularity' },
  ],
});

const records = [];

for (let i = 0; i < 10; i += 1) {
  records.push(create.makeFakeSong());
}

// const adding = (array) => {
//   console.time('************************************************************');
//   const promises = Promise.all(
//     array.map((songItem) => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           console.log(songItem);
//           return await db.addSong(songItem);
//         } catch (err) {
//           console.error(err);
//           return reject(err);
//         }
//       });
//     }),
//   );
//   console.timeEnd(
//     '************************************************************',
//   );
//   return promises;
// };

// adding(records);

// writes to csv
csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English
