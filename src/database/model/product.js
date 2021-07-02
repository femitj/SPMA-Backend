import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: String,
    price: String,
    address: String,
    quantity: Number,
    imageUrl: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    description: String,
    mapCordinate: String,
    price: String,
    status: String,
    lgaId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lga',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const productModel = mongoose.model('product', ProductSchema);

export default productModel;
