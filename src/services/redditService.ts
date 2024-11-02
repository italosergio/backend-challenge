import axios from 'axios';
import Post from '../models/Post';
import IRedditPostData from '../interfaces/IRedditPostData';
import { IPost } from '../interfaces/IPosts';

async function fetchAndSaveHotPosts(): Promise<void> {
  try {
    const response = await axios.get('https://www.reddit.com/r/artificial/hot.json');
    const posts: IPost[] = response.data.data.children.map((child: { data: IRedditPostData }) => ({
      title: child.data.title,
      author: child.data.author,
      created_utc: new Date(child.data.created_utc * 1000),
      ups: child.data.ups,
      num_comments: child.data.num_comments,
    }));

    await Post.deleteMany({});
    console.log("Dados do Banco 'Posts' resetados!");

    await Post.insertMany(posts);
    console.log("Posts hot do Reddit, salvos com sucesso!");
    
  } catch (error) {
    console.error("Erro ao consultar ou salvar posts:", error);
  }
}

export default fetchAndSaveHotPosts;
