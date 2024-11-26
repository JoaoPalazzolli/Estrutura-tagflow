import tagController from './controller/TagController';
import express from 'express';

const app = express();

app.use(express.json());

app.use(tagController);

app.listen(3000, () => console.log("Rodando na porta 3000"));