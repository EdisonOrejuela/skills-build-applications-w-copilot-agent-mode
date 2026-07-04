import express from 'express';
import { getApiBaseUrl } from '../config/api';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const router = express.Router();

async function sendCollection(res: express.Response, model: any, name: string) {
  try {
    const data = await model.find({}).lean();
    res.json({ baseUrl: getApiBaseUrl(), collection: name, count: data.length, data });
  } catch (error) {
    res.status(500).json({ error: `Failed to load ${name}`, details: error });
  }
}

router.get('/api/users', async (_req, res) => {
  await sendCollection(res, User, 'users');
});

router.get('/api/teams', async (_req, res) => {
  await sendCollection(res, Team, 'teams');
});

router.get('/api/activities', async (_req, res) => {
  await sendCollection(res, Activity, 'activities');
});

router.get('/api/leaderboard', async (_req, res) => {
  await sendCollection(res, LeaderboardEntry, 'leaderboard');
});

router.get('/api/workouts', async (_req, res) => {
  await sendCollection(res, Workout, 'workouts');
});

export default router;
