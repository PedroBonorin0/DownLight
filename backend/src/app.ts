import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3008;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.listen(port, () => {
  return console.log(`Server is running on http://localhost:${port}`);
});
