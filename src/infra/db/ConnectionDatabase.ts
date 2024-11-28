import environments from '../configs/LoadEnvironment';
import { Pool } from 'pg';

const pool = new Pool({
  user: environments.DATABASE_USERNAME,
  host: environments.DATABASE_HOST,
  database: environments.DATABASE_SCHEMA,
  password: environments.DATABASE_PASSWORD,
  port: environments.DATABASE_PORT
});

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no PostgreSQL', err);
  } else {
    console.log('Conectado ao PostgreSQL');
  }
});

export default pool;

