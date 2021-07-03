import mongoose from 'mongoose';

const { Schema } = mongoose;

const StateSchema = new Schema(
  {
    name: String,
    stateId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'state',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const stateModel = mongoose.model('state', StateSchema);

export default stateModel;
