import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import User from './models/users';

import { MONGODB_URL, JWT_SECRET_TOKEN } from './env';

// initialize websocket server
import './websocket';
const app = express();

mongoose.connect(
  MONGODB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connected');
  }
);

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ok');
});

app.post('/api/register', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: 'error', error: 'Invalid email/password' });
  }
  // TODO: Hashing the password
  try {
    const user = new User({ email, password });
    await user.save();
  } catch (error) {
    console.log('Error', error);
    res.json({ status: 'error', error: 'Duplicate email' });
  }
  res.json({ status: 'ok' });
});

app.post('/api/refresh', () => {});

app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email, password }).lean();
  if (!user) {
    return res.json({
      status: 'error',
      error: 'Please check your email and password',
    });
  }

  const payload = jwt.sign({ email }, JWT_SECRET_TOKEN);

  return res.json({ status: 'ok', data: payload });
});

app.listen(1337);
