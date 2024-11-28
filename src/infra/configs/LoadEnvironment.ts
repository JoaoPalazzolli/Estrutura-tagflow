import dotenv from 'dotenv';

dotenv.config();

const environmentsValues = {
    PORT: process.env.PORT || 3000,
    DATABASE_USERNAME: process.env.DATABASE_URL || "",
    DATABASE_PASSWORD: process.env.DATABASE_COLLECTION || "",
    DATABASE_HOST: process.env.DATABASE_NAME || "",
    DATABASE_SCHEMA: process.env.DATABASE_NAME || "",
    DATABASE_PORT: Number(process.env.DATABASE_NAME) || 5432
}

export default environmentsValues;