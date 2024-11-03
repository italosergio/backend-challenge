import { Request, Response } from 'express';
import post from '../models/Post';

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  const { start, end } = req.query as { start?: string; end?: string };

  if (!start || !end) {
    return res.status(400).json({ error: "Parâmetros 'start' e 'end' são obrigatórios." });
  }

  try {
    const posts = await post.find({
      created_utc: { $gte: new Date(start), $lte: new Date(end) },
    }).sort({ created_utc: -1 });

    return res.json({ posts, count: posts.length });
  } catch (error) {
    console.error(error); // Log do erro
    return res.status(500).json({ error: "Erro ao buscar posts." });
  }
};

export const getSortedPosts = async (req: Request, res: Response): Promise<Response> => {
  const { start, end, order } = req.query as { start?: string; end?: string; order?: string };

  if (!start || !end || !order) {
    return res.status(400).json({ error: "Parâmetros 'start', 'end' e 'order' são obrigatórios." });
  }

  if (order !== 'ups' && order !== "num_comments") {
    return res.status(400).json({ error: "Parâmetro de ordenação deve ser 'ups' ou 'num_comments'" });
  }
  
  try {
    const posts = await post.find({
      created_utc: { $gte: new Date(start), $lte: new Date(end) },
    }).sort({ [order]: -1 });

    return res.json({ posts, count: posts.length });
  } catch (error) {
    console.error(error); // Log do erro
    return res.status(500).json({ error: "Erro ao buscar posts." });
  }
};
