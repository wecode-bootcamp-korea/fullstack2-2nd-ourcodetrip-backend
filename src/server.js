import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const { PORT } = process.env;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`OUR CODE TRIP Backend server is listening on ${PORT}!`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
