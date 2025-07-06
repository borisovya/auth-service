import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService); // ✅ получаем Prisma
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'admin@example.com' } });
    await app.close();
  });

  it('/user/getList (GET) — ❌ without token', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer()).get('/user/getList').expect(401); // 👈 ожидаем неавторизованный
  });

  // it('/user/getList (GET) — ✅ with ADMIN role', async () => {
  //   // 🔐 логинимся и получаем токен
  //   const loginRes = await request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({ email: 'admin@example.com', password: 'Test123', role: 'ADMIN' });
  //
  //   const token = loginRes.body?.access_token;
  //
  //   const res = await request(app.getHttpServer())
  //     .get('/user/getList')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);
  //
  //   expect(Array.isArray(res.body)).toBe(true);
  //   expect(res.body[0]).toHaveProperty('email');
  // });
});
