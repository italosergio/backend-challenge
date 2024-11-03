import cron from 'node-cron';
import fetchAndSaveHotPosts from './redditService';

async function startCronJob(): Promise<void> {
  await fetchAndSaveHotPosts()
  const time = process.env.TIME_TO_REQUEST_REDDIT || "7"
  cron.schedule(`0 ${time} * * *`, async () => {
    await fetchAndSaveHotPosts();
  });
  console.log(`Próxima requisição de Posts HOT do Reddit agendada para às ${time} horas`)
}

export default startCronJob;
