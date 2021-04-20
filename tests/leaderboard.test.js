import { beforeEach, expect, it } from '@jest/globals';
import Leaderboard from '../src/leaderboard';
import 'regenerator-runtime/runtime';

const GAME_ID = 'TNtgfC4RmsugffjoHvi8';
const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

// fetch mock
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    result: [
      { user: 'Tim', score: 1200 },
      { user: 'Randy', score: 2300 },
      { user: 'Ray', score: 600 },
      { user: 'James', score: 200 },
    ],
  }),
}));

it('Returns array of objects containing user and score properties', async () => {
  const data = await Leaderboard.getScores();
  expect(data).toEqual([
    { user: 'Tim', score: 1200 },
    { user: 'Randy', score: 2300 },
    { user: 'Ray', score: 600 },
    { user: 'James', score: 200 },
  ]);
  expect(fetch).toHaveBeenCalledTimes(1);
});

beforeEach(() => {
  fetch.mockClear();
});

it('Calls fetch() 2 times with given arguments and returns 900', async () => {
  const result = await Leaderboard.offerScore('James', 900);
  expect(result).toEqual(900);
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenLastCalledWith(`${BASE_URL}games/${GAME_ID}/scores/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: 'James', score: 900 }),
  });
});


it('Calls fetch() 1 time with given arguments and returns 200', async () => {
  const result = await Leaderboard.offerScore('James', 100);
  expect(result).toEqual(200);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenLastCalledWith(`${BASE_URL}games/${GAME_ID}/scores/`, {
    mode: 'cors',
  });
});