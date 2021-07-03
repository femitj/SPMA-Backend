import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentReplySchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    imageUrl: String,
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const commentReplyModel = mongoose.model('commentReply', CommentReplySchema);

export default commentReplyModel;
