import express from 'express';
import postRoutes from './routes/postRoutes';
import startCronJob from './services/cronJob';
import connectMongo from './database/config';
import fetchAndSaveHotPosts from './services/redditService';

const app = express();
const PORT = process.env.PORT || 3000;

connectMongo();

app.use(express.json());
app.use('/posts', postRoutes);

fetchAndSaveHotPosts();
// startCronJob();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
