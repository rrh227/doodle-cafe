const express = require('express');
const cors = require('cors');
const path = require('path');
const { rateLimit } = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api', (req, res, next) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
  next();
});

const judgeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait a moment.' },
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const judgeHandler = require('./api/judge');
app.post('/api/judge', judgeLimiter, judgeHandler);

app.use(express.static(path.join(__dirname, 'client')));

app.listen(PORT, () => {
  console.log(`Doodle Cafe server running at http://localhost:${PORT}`);
});
