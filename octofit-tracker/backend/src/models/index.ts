import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'member', 'coach'], default: 'member' },
    goal: { type: String, required: true },
    city: { type: String, required: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    goal: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    durationMinutes: { type: Number, required: true },
    equipment: [{ type: String }],
    focusAreas: [{ type: String }],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);

export default {
  User,
  Team,
  Activity,
  LeaderboardEntry,
  Workout,
};
