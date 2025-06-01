import mongoose, { Schema, Document } from 'mongoose';

export interface IPickupRequest extends Document {
  userId: mongoose.Types.ObjectId;
  status: string;
  date: Date;
  // Add other fields as needed (e.g., pickupDetails)
  pickupDetails: object;
}

const PickupRequestSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now },
  pickupDetails: { type: Schema.Types.Mixed, required: true },
});

export default mongoose.model<IPickupRequest>('PickupRequest', PickupRequestSchema);
