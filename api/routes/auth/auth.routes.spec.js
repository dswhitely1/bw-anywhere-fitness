const request = require('supertest');
const server = require('../../server');

describe('Auth Router', () => {
  it('tests are running with NODE_ENV set as "testing"', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
  describe('Register', () => {
    it('returns 201 on successful create', async () => {
      const expectedStatus = 201;
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'Test',
          password: 'Test',
          roleId: 2,
        });
      expect(response.status).toBe(expectedStatus);
      expect(response.type).toBe('application/json');
    });
    it('returns 400 on duplicate username', async () => {
      const expectedStatus = 400;
      const response = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'Test',
          password: 'Test',
          roleId: 2,
        });
      expect(response.status).toBe(expectedStatus);
      expect(response.type).toBe('application/json');
      expect(response.body.message).toBe('Username is already taken');
    });
  });
  describe('Login', () => {
    it('returns 404 on unknown User', async () => {
      const expectedStatus = 404;
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'NotHere', password: 'Test' });
      expect(response.status).toBe(expectedStatus);
    });
    it('returns 401 on Incorrect Password', async () => {
      const expectedStatus = 401;
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'Test', password: 'BadPassword' });
      expect(response.status).toBe(expectedStatus);
    });
    it('returns 200 on Successful Login', async () => {
      const expectedStatus = 200;
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'Test', password: 'Test' });
      expect(response.status).toBe(expectedStatus);
    });
  });
  describe('Auth Router Test CleanUp', () => {
    it('removes the Test User', async () => {
      const loginResponse = await request(server)
        .post('/api/auth/login')
        .send({ username: 'Test', password: 'Test' });
      const { token } = loginResponse.body;
      const response = await request(server)
        .delete('/api/user')
        .set('Authorization', token);
      const expectedStatus = 200;
      expect(response.status).toBe(expectedStatus);
    });
  });
});
