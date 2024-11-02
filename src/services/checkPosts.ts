import axios from 'axios';
import readlineSync from 'readline-sync';

function convertToISO(dateString: string): string {
  const regex = /^(\d{2})(\d{2})(\d{4})$/;

  const match = dateString.match(regex);
  if (!match) {
    throw new Error('Formato de data inválido. Use DDMMYYYY.');
  }

  const day = Number(match[1]);
  const month = Number(match[2]) - 1; 
  const year = Number(match[3]);

  const date = new Date(year, month, day);
  return date.toISOString();
}

async function checkPosts() {
  const startDateInput = readlineSync.question('Insira a data de início (DDMMYYYY): ');
  const endDateInput = readlineSync.question('Insira a data de fim (DDMMYYYY): ');

  try {
    const startDate = convertToISO(startDateInput);
    const endDate = convertToISO(endDateInput);

    const response = await axios.get('http://localhost:3000/posts', {
      params: {
        start: startDate,
        end: endDate
      }
    });
    console.log("Posts encontrados:", response.data);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
}

checkPosts();
