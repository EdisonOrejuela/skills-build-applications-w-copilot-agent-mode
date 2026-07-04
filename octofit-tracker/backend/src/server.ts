import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
