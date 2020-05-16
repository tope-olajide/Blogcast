import mongoose from 'mongoose';

const { Schema } = mongoose;

const standardPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  tag: [String],
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
export default mongoose.model('StandardPosts', standardPostSchema);
