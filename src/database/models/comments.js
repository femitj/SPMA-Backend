import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    imageUrl: String,
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    commentReplies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'commentReply',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const commentModel = mongoose.model('comment', CommentSchema);

export default commentModel;
