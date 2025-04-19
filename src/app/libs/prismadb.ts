import { PrismaClient } from '@prisma/client';

// Extend the globalThis type to include 'prisma'

let prisma: PrismaClient | undefined;


// Initialize the PrismaClient singleton
const client =  prisma || new PrismaClient();

// Attach the client to globalThis in non-production environments to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
   prisma = client;
}

export default client;
