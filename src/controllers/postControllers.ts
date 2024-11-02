import { Request, Response } from 'express';
import post from '../models/Post';

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "Parâmetros 'start' e 'end' são obrigatórios." });
  }

  try {
    const posts = await post.find({
      created_utc: { $gte: new Date(start as string), $lte: new Date(end as string) },
    }).sort({ created_utc: -1 });

    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar posts." });
  }
};

export const getSortedPosts = async (req: Request, res: Response): Promise<Response> => {
  const { start, end, order } = req.query;

  if (!start || !end || !order) {
    return res.status(400).json({ error: "Parâmetros 'start', 'end' e 'order' são obrigatórios." });
  }

  if (order !== 'ups' && order !== "num_comments") {
    return res.status(400).json({ error: "Parâmetro de ordenação deve ser 'ups' ou 'num_comments'" });
  }
  
  const sortField = order;

  try {
    const posts = await post.find({
      created_utc: { $gte: new Date(start as string), $lte: new Date(end as string) },
    }).sort({ [sortField]: -1 });

    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar posts." });
  }
};
