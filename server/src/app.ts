import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import analyzeRoute from './routes/analyze';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // For development. In production, restrict to frontend domain.
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', analyzeRoute);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
