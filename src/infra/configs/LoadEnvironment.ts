import dotenv from 'dotenv';

dotenv.config();

const environmentsValues = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || "",
    DATABASE_COLLECTION: process.env.DATABASE_COLLECTION || ""
}

export default environmentsValues;