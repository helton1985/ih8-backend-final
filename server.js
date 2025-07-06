const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const planRoutes = require('./routes/plans');
const trialRoutes = require('./routes/trials');
const userRoutes = require('./routes/users');
const webhookRoutes = require('./routes/webhooks');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'IH8 API is healthy' });
});
app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/users', userRoutes);
app.use('/api/webhooks', webhookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
