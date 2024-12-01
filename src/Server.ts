import express from 'express';
import cors from 'cors';
import tagRoutes from './routes/TagRoutes';
import countRoutes from './routes/CountRoutes';
import environmentsValues from './infra/configs/LoadEnvironment';

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'], // Permite a origem do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));
app.use(express.json());

app.use(tagRoutes);
app.use(countRoutes);

app.listen(environmentsValues.PORT, () => console.log("Rodando na porta 3000"));
