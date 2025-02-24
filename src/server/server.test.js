const request = require('supertest');
const app = require('./index');

// Adjust path if needed to point to your server.js

describe('Express Server Endpoints', () => {
  // Test the GET /all route
  test('GET /all should return status 200 and an object', async () => {
    const response = await request(app).get('/all');
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe('object');
  });

  // Test the POST /add route
  test('POST /add should update projectData and return it', async () => {
    const newData = { temp: 75, feel: 'happy', date: '2025-01-01' };
    const response = await request(app)
      .post('/add')
      .send(newData);

    expect(response.statusCode).toBe(200);
    // The response body should match the data we sent
    expect(response.body).toEqual(newData);

    const getResponse = await request(app).get('/all');
    expect(getResponse.body).toEqual(newData);
  });
});
