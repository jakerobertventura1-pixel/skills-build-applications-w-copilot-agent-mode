import mongoose, { Schema, Document } from 'mongoose';

interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  activityType: string;
  duration: number; // in minutes
  calories: number;
  distance?: number; // in km
  date: Date;
  notes?: string;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: { type: Number },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
