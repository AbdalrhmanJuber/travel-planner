// src/client/js/app.test.js

import { calculateDaysAway } from './app';

describe('Testing the calculateDaysAway function', () => {
  test('It should return 1 if departure is tomorrow', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isoString = tomorrow.toISOString().split('T')[0];

    const result = calculateDaysAway(isoString);
    expect(result).toBe(1);
  });

  test('It should return 0 if departure is today', () => {
    const today = new Date();
    const isoString = today.toISOString().split('T')[0];

    const result = calculateDaysAway(isoString);
    expect(result).toBe(0);
  });
});
