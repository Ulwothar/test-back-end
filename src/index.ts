import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  console.log('Server called!');
  res.send({ message: 'Server is running!' });
});

app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
