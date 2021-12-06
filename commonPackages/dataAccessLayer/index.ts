import { PrismaClient } from "@prisma/client";
import { Context } from "./index.d";

const prisma = new PrismaClient();

export const createPrismaClient = async (ctx: any): Promise<Context> => ({ ...ctx, prisma });
