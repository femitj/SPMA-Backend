import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    address: {
      type: String,
      required: true,
    },
    quantity: Number,
    imageUrl: String,
    mapCordinate: String,
    price: {
      type: String,
      required: true,
    },
    status: String,
    lga: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const productModel = mongoose.model('product', ProductSchema);

export default productModel;
