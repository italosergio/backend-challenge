import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function connectMongo(): Promise<void> {
  return mongoose.connect(process.env.MONGO_URI as string, {})
    .then(() => {
      console.log('Conectado ao MongoDB com sucesso!');
    })
    .catch(err => {
      console.error('Erro ao conectar ao MongoDB:', err);
    });
}
