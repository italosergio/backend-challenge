export interface IPost extends Document {
  title: string;
  author: string;
  created_utc: Date;
  ups: number;
  num_comments: number;
}