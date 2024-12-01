import express from 'express';
import cors from 'cors';
import tagRoutes from './routes/TagRoutes';
import countRoutes from './routes/CountRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(tagRoutes);
app.use(countRoutes);

app.listen(3000, () => console.log("Rodando na porta 3000"));
