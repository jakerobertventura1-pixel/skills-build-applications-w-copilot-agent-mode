import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  const connection = await mongoose.connect(MONGODB_URI);
  console.log(`✓ MongoDB connected to ${MONGODB_URI}`);
  return connection;
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

export const getMongoUri = () => MONGODB_URI;
