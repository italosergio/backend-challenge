import { Router, RequestHandler } from 'express';
import { getPosts, getSortedPosts } from '../controllers/postControllers';

const router = Router();

// Usando RequestHandler para tipagem genérica
router.get('/', getPosts as unknown as RequestHandler);
router.get('/sorted', getSortedPosts as unknown as RequestHandler);

export default router;
