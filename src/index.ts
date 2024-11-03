import express from 'express';
import postRoutes from './routes/postRoutes';
import startCronJob from './services/cronJob';
import connectMongo from './database/config';

const app = express();
const PORT = process.env.PORT || 3000;

connectMongo();

app.use(express.json());
app.use('/posts', postRoutes);

if (process.env.NODE_ENV === "development") {
  console.log("Servidor rodando em modo DESENVOLVIMENTO")
  startCronJob();
  // outras competencias do ambiente de desenvolvimento
}

if (process.env.NODE_ENV === "production") {
  console.log("Servidor rodando em modo PRODUÇÃO")
  startCronJob();
  // outras competencias do ambiente de produção
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
