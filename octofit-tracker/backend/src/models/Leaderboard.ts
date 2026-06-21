import mongoose, { Schema, Document } from 'mongoose';

interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  teamId?: mongoose.Types.ObjectId;
  teamName?: string;
  rank: number;
  points: number;
  totalWorkouts: number;
  totalCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    teamName: { type: String },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    totalWorkouts: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
