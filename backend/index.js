import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); // Habilita CORS
app.use(express.json());

app.get('/api/pizzas', (req, res) => {
  res.json([{ id: 1, name: 'Margarita' }]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
