import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  await prisma.$connect();
  console.log('✅ Connected to DB');
  await prisma.$disconnect();
}

testConnection();
