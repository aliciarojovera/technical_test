import { PrismaService } from "./prismaService";

const prismaClientSingleton = () => {
  return new PrismaService();
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const prismaSingleton: ReturnType<typeof prismaClientSingleton> =
  //@ts-ignore
  globalThis.prismaSingleton ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  //@ts-ignore
  globalThis.prismaSingleton = prismaSingleton;
