import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { createE2eApp } from './e2e-setup';

describe('Application (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health/live returns 200', () => {
    return request(app.getHttpServer()).get('/api/v1/health/live').expect(200);
  });

  it('GET /api/v1/health/ready returns 200', () => {
    return request(app.getHttpServer()).get('/api/v1/health/ready').expect(200);
  });
});

describe('Auth and RBAC (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/v1/auth/login returns tokens for seeded admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com',
        password: process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!',
      })
      .expect(200);

    const body = response.body.data ?? response.body;
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();
    accessToken = body.accessToken;
    refreshToken = body.refreshToken;
  });

  it('GET /api/v1/auth/me returns profile with token', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const body = response.body.data ?? response.body;
    expect(body.email).toBe(
      process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com',
    );
    expect(Array.isArray(body.permissionCodes)).toBe(true);
    expect(body.permissionCodes.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/users returns 200 for admin', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('GET /api/v1/users returns 401 without token', () => {
    return request(app.getHttpServer()).get('/api/v1/users').expect(401);
  });

  it('POST /api/v1/auth/refresh rotates tokens', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refreshToken })
      .expect(200);

    const body = response.body.data ?? response.body;
    expect(body.accessToken).toBeDefined();
    accessToken = body.accessToken;
    refreshToken = body.refreshToken;
  });

  it('POST /api/v1/auth/logout revokes session', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ refreshToken })
      .expect(204);
  });
});

describe('Foundation public API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    app = await createE2eApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/site-settings returns 200 without token', () => {
    return request(app.getHttpServer())
      .get('/api/v1/site-settings')
      .expect(200);
  });
});

describe('Admin foundation (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;

  beforeAll(async () => {
    app = await createE2eApp();
    const login = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com',
        password: process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!',
      });
    const body = login.body.data ?? login.body;
    accessToken = body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/admin/dashboard/stats returns 200 for admin', () => {
    return request(app.getHttpServer())
      .get('/api/v1/admin/dashboard/stats')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('GET /api/v1/admin/site-settings returns 200 for admin', () => {
    return request(app.getHttpServer())
      .get('/api/v1/admin/site-settings')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('GET /api/v1/admin/site-settings returns 401 without token', () => {
    return request(app.getHttpServer())
      .get('/api/v1/admin/site-settings')
      .expect(401);
  });

  it('GET /api/v1/users/:id/export returns GDPR package shape', async () => {
    const me = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const profile = me.body.data ?? me.body;

    const response = await request(app.getHttpServer())
      .get(`/api/v1/users/${profile.id}/export`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const body = response.body.data ?? response.body;
    expect(typeof body.exportedAt).toBe('string');
    expect(body.user).toMatchObject({
      id: profile.id,
      email: profile.email,
    });
    expect(body.oauth).toEqual(
      expect.objectContaining({ linked: expect.any(Boolean) }),
    );
    expect(Array.isArray(body.auditEvents)).toBe(true);
  });

  it('POST /api/v1/users/:id/anonymize clears PII for a disposable user', async () => {
    const email = `gdpr-e2e-${Date.now()}@example.com`;
    const created = await request(app.getHttpServer())
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email,
        password: 'TempUser1!',
        isActive: true,
      })
      .expect(201);
    const user = created.body.data ?? created.body;

    await request(app.getHttpServer())
      .post(`/api/v1/users/${user.id}/anonymize`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204);

    const listed = await request(app.getHttpServer())
      .get(`/api/v1/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    // Soft-deleted users may 404 or return anonymized email depending on findById
    if (listed.status === 200) {
      const body = listed.body.data ?? listed.body;
      expect(String(body.email)).toContain('anonymized');
    } else {
      expect(listed.status).toBe(404);
    }
  });
});
