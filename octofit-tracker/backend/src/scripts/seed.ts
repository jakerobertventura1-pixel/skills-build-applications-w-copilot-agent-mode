/**
 * Seed the octofit_db database with test data
 *
 * This script populates realistic users, teams, activities, leaderboard entries,
 * and workouts for OctoFit Tracker.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const sampleUsers = [
  {
    username: 'sophia_fit',
    email: 'sophia@example.com',
    passwordHash: 'hashedpassword1',
    firstName: 'Sophia',
    lastName: 'Reed',
  },
  {
    username: 'michael_power',
    email: 'michael@example.com',
    passwordHash: 'hashedpassword2',
    firstName: 'Michael',
    lastName: 'Tran',
  },
  {
    username: 'ariana_active',
    email: 'ariana@example.com',
    passwordHash: 'hashedpassword3',
    firstName: 'Ariana',
    lastName: 'Scott',
  },
  {
    username: 'kevin_runner',
    email: 'kevin@example.com',
    passwordHash: 'hashedpassword4',
    firstName: 'Kevin',
    lastName: 'Brooks',
  },
];

const sampleTeams = [
  {
    name: 'Sunrise Striders',
    description: 'Morning runners who love early workouts and community goals.',
  },
  {
    name: 'Core Crushers',
    description: 'Strength and conditioning specialists focused on lifting and HIIT.',
  },
];

const sampleActivities = [
  {
    activityType: 'Running',
    duration: 38,
    calories: 420,
    distance: 6.2,
    notes: 'Interval pace work along the river trail.',
  },
  {
    activityType: 'Yoga',
    duration: 50,
    calories: 220,
    notes: 'Vinyasa session for mobility and breath control.',
  },
  {
    activityType: 'Cycling',
    duration: 45,
    calories: 520,
    distance: 18.0,
    notes: 'Hill intervals with team pace training.',
  },
  {
    activityType: 'Strength Training',
    duration: 60,
    calories: 480,
    notes: 'Full-body barbell workout focusing on form.',
  },
];

const sampleWorkouts = [
  {
    title: 'Morning Energy Booster',
    description: 'Sunrise HIIT with bodyweight exercises and light cardio.',
    duration: 30,
    intensity: 'high',
    caloriesBurned: 320,
    category: 'HIIT',
  },
  {
    title: 'Recovery Stretch Sequence',
    description: 'Gentle full-body stretching and mobility flow.',
    duration: 25,
    intensity: 'low',
    caloriesBurned: 110,
    category: 'Recovery',
  },
  {
    title: 'Endurance Ride',
    description: 'Long-distance steady-state cycling workout for stamina.',
    duration: 75,
    intensity: 'medium',
    caloriesBurned: 760,
    category: 'Cycling',
  },
];

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB: ${MONGODB_URI}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const createdUsers = await User.insertMany(sampleUsers.map(user => ({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  })));

  const teamDocs = await Promise.all(sampleTeams.map(async (team, index) => {
    const leader = createdUsers[index % createdUsers.length];
    const members = [leader._id, createdUsers[(index + 1) % createdUsers.length]._id];
    return Team.create({
      ...team,
      leader: leader._id,
      members,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }));

  const activities = await Promise.all(
    sampleActivities.map(async (activity, index) => {
      const user = createdUsers[index % createdUsers.length];
      return Activity.create({
        ...activity,
        userId: user._id,
        date: new Date(Date.now() - index * 86400000),
      });
    })
  );

  const workouts = await Promise.all(
    sampleWorkouts.map(async (workout, index) => {
      const user = createdUsers[index % createdUsers.length];
      return Workout.create({
        ...workout,
        userId: user._id,
        date: new Date(Date.now() - index * 7200000),
      });
    })
  );

  const leaderboardEntries = await Promise.all(
    createdUsers.map(async (user, index) => {
      const team = teamDocs[index % teamDocs.length];
      return Leaderboard.create({
        userId: user._id,
        username: user.username,
        teamId: team._id,
        teamName: team.name,
        rank: index + 1,
        points: 1600 - index * 120,
        totalWorkouts: 12 + index,
        totalCalories: 5400 - index * 480,
      });
    })
  );

  console.log('Seed data created:');
  console.log(`- Users: ${createdUsers.length}`);
  console.log(`- Teams: ${teamDocs.length}`);
  console.log(`- Activities: ${activities.length}`);
  console.log(`- Workouts: ${workouts.length}`);
  console.log(`- Leaderboard entries: ${leaderboardEntries.length}`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
