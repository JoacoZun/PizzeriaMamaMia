import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://joacozun.github.io/PizzeriaMamaMia',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.get('/api/pizzas', (req, res) => {
  res.json([{ id: 1, name: 'Margarita' }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
