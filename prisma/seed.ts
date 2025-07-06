import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { email: 'admin@example.com' },
  });

  if (!existingAdmin) {
    const hashedPassword: string = await bcrypt.hash('dev10', 10);

    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        fullName: 'Super Admin',
        isActive: true,
        hasSubscription: true,
      },
    });

    console.log('✅ Super Admin user created');
  } else {
    console.log('ℹ️ Super Admin user already exists');
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e: unknown) => {
    if (e instanceof Error) {
      console.error('❌ Seed error:', e.message);
    } else {
      console.error('❌ Unknown seed error');
    }
    prisma.$disconnect();
    process.exit(1);
  });
