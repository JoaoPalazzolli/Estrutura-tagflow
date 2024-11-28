import tagController from './controller/TagController';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(tagController);

app.listen(3000, () => console.log("Rodando na porta 3000"));
