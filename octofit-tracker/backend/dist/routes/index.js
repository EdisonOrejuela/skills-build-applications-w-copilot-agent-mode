"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../config/api");
const models_1 = require("../models");
const router = express_1.default.Router();
async function sendCollection(res, model, name) {
    try {
        const data = await model.find({}).lean();
        res.json({ baseUrl: (0, api_1.getApiBaseUrl)(), collection: name, count: data.length, data });
    }
    catch (error) {
        res.status(500).json({ error: `Failed to load ${name}`, details: error });
    }
}
router.get('/api/users', async (_req, res) => {
    await sendCollection(res, models_1.User, 'users');
});
router.get('/api/teams', async (_req, res) => {
    await sendCollection(res, models_1.Team, 'teams');
});
router.get('/api/activities', async (_req, res) => {
    await sendCollection(res, models_1.Activity, 'activities');
});
router.get('/api/leaderboard', async (_req, res) => {
    await sendCollection(res, models_1.LeaderboardEntry, 'leaderboard');
});
router.get('/api/workouts', async (_req, res) => {
    await sendCollection(res, models_1.Workout, 'workouts');
});
exports.default = router;
