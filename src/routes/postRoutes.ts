import { Router, RequestHandler } from 'express';
import { getPosts, getSortedPosts, phraseScore } from '../controllers/postControllers';

const router = Router();

router.get('/', getPosts as unknown as RequestHandler);
router.get('/sorted', getSortedPosts as unknown as RequestHandler);
router.get('/score', phraseScore as unknown as RequestHandler);

export default router;
