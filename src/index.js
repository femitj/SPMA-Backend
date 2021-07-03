import '@babel/polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import router from './routes';
import dbConnection from './config/dbconnection';

const { NODE_ENV } = process.env;
const app = express();

// Public Folder
app.use(express.static('./public'));

dotenv.config();
if (NODE_ENV === 'development' || NODE_ENV === 'production') {
  app.use(logger('dev'));
}
app.use(express.text());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

dbConnection();

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to SMPA API',
  });
});

app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening to port: ${port}`));

export default app;
