import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces/IPosts';

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  created_utc: { type: Date, required: true },
  ups: { type: Number, required: true },
  num_comments: { type: Number, required: true },
});

export default mongoose.model<IPost>('Post', PostSchema);
