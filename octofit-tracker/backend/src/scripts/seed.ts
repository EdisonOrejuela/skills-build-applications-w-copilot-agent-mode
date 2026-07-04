import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'admin',
        goal: 'Complete a half marathon',
        city: 'London',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Grace Hopper',
        email: 'grace@example.com',
        role: 'coach',
        goal: 'Build strength and endurance',
        city: 'New York',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Katherine Johnson',
        email: 'katherine@example.com',
        role: 'member',
        goal: 'Improve mobility and cardio',
        city: 'Atlanta',
        fitnessLevel: 'beginner',
      },
    ]);

    await Team.insertMany([
      {
        name: 'River Runners',
        sport: 'Running',
        captain: users[0].name,
        members: users.slice(0, 2).map((user) => user.name),
        goal: 'Train for the city marathon',
        location: 'Seattle',
      },
      {
        name: 'Peak Performers',
        sport: 'CrossFit',
        captain: users[1].name,
        members: [users[1].name, users[2].name],
        goal: 'Win the community challenge',
        location: 'Denver',
      },
    ]);

    await Activity.insertMany([
      {
        userName: users[0].name,
        type: 'Run',
        durationMinutes: 35,
        distanceKm: 5.6,
        caloriesBurned: 320,
        date: new Date('2026-07-01T06:30:00.000Z'),
        notes: 'Morning interval run',
      },
      {
        userName: users[1].name,
        type: 'Cycling',
        durationMinutes: 45,
        distanceKm: 18.2,
        caloriesBurned: 410,
        date: new Date('2026-07-02T18:00:00.000Z'),
        notes: 'Steady endurance ride',
      },
      {
        userName: users[2].name,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        date: new Date('2026-07-03T07:00:00.000Z'),
        notes: 'Focused mobility flow',
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userName: users[0].name, score: 1280, streak: 6, rank: 1 },
      { userName: users[1].name, score: 1210, streak: 4, rank: 2 },
      { userName: users[2].name, score: 1090, streak: 2, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Burst',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 25,
        equipment: ['Jump rope', 'Mat'],
        focusAreas: ['Cardio', 'Core'],
        description: 'Fast-paced intervals that elevate heart rate quickly.',
      },
      {
        name: 'Core Strength',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 20,
        equipment: ['Mat'],
        focusAreas: ['Abs', 'Back'],
        description: 'A beginner-friendly core circuit for posture and stability.',
      },
      {
        name: 'Power Flow',
        category: 'Mobility',
        difficulty: 'Advanced',
        durationMinutes: 40,
        equipment: ['Yoga block'],
        focusAreas: ['Mobility', 'Balance'],
        description: 'A dynamic flow sequence for strength and flexibility.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
