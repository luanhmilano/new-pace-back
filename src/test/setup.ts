import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync('npx prisma migrate dev');
});

afterAll(async () => {
  await prisma.$disconnect();
});
