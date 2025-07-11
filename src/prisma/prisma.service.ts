import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    await super.$connect(); // ✅ безопасный вызов
  }

  async onModuleDestroy(): Promise<void> {
    await super.$disconnect(); // ✅ безопасный вызов
  }
}
