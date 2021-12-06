import { PrismaClient } from "@prisma/client";

export function createPrismaClient(ctx: any): Promise<Context>;

export * from ".prisma/client/index.d";

export interface Context {
  prisma: PrismaClient;
}
