import mongoose from 'mongoose';
import environments from '../configs/LoadEnvironment';

export async function connectToDatabase() {
    try {
        // Conectar ao cliente MongoDB
        const db = await mongoose.connect(environments.DATABASE_URL)
        return db.connection;
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB", err);
        throw err;
    }
}

export default connectToDatabase;
