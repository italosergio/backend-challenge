import cron from 'node-cron';
import fetchAndSaveHotPosts from './redditService';

function startCronJob(): void {
  cron.schedule('0 7 * * *', async () => {
    console.log("Próxima captura de dados de Posts às 7AM");
    await fetchAndSaveHotPosts();
  });
}

export default startCronJob;
