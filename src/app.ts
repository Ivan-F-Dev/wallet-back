import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('ok')
})

export default app;
