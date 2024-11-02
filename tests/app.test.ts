import request from 'supertest';
import express from 'express';
import post from '../src/models/Post';
import connectMongo from '../src/database/config';
import app from '../src/index';

beforeAll(async () => {
  await connectMongo();
});

afterAll(async () => {
  await post.deleteMany({});
  
});

describe('Testes das rotas de /posts', () => {
  test('GET /posts - deve retornar 400 se os parâmetros start e end não forem fornecidos', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Parâmetros 'start' e 'end' são obrigatórios.");
  });

  test('GET /posts - deve retornar posts com base no intervalo fornecido', async () => {
    const response = await request(app).get('/posts?start=2024-01-01T00:00:00Z&end=2024-01-02T00:00:00Z');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test('GET /posts/sorted - deve retornar 400 se os parâmetros start, end e order não forem fornecidos', async () => {
    const response = await request(app).get('/posts/sorted');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Parâmetros 'start', 'end' e 'order' são obrigatórios.");
  });

  test('GET /posts/sorted - deve retornar posts ordenados por "ups"', async () => {

    const response = await request(app).get('/posts/sorted?start=2024-01-01T00:00:00Z&end=2024-01-02T00:00:00Z&order=ups');
    expect(response.status).toBe(200);
  });
});
