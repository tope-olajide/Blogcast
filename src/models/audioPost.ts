import mongoose from 'mongoose';

const { Schema } = mongoose;

const audioPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  tag: [String],
  audioUrl: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
  },
  featureImageUrl: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
export default mongoose.model('AudioPost', audioPostSchema);
