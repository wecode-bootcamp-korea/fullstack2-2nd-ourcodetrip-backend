import csv from 'csv-parser';
import fs from 'fs';

export const readFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(`src/utils/dataUploader/csv/${fileName}.csv`)
      .on('error', (err) => {
        console.log('\x1b[31m', 'File read failed');
        console.error(err);
        reject({ error: 'No such file or directory' });
      })
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        console.log('\x1b[33m', `=== Read data from ${fileName}.csv ===`);
        for (let data of results) {
          for (let key in data) {
            if (
              key.endsWith('Id') ||
              key.endsWith('Count') ||
              key === 'count' ||
              key === 'rating'
            ) {
              data[key] = parseInt(data[key]);
            }
            if (
              key === 'price' ||
              key.endsWith('Rate') ||
              key.endsWith('Price')
            ) {
              data[key] = parseFloat(data[key]);
            }
            if (key.startsWith('is')) {
              data[key] = JSON.parse(data[key]);
            }
            if (key.endsWith('Date')) {
              data[key] = new Date(data[key]);
            }
          }
          console.log(data);
        }
        resolve(results);
      });
  });
};
