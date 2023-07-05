import { prisma } from "@/lib/prisma";
import { Prisma, Status } from "@prisma/client";
import { StatusRepository } from "../status-repository";


export class PrismaStatusRepository implements StatusRepository {
  async findAll(): Promise<Status[]> {
    const allStatus = await prisma.status.findMany({
      orderBy: { created_at: "desc" },
    });

    return allStatus;
  }
  async findByName(name: string) {
    const status = await prisma.status.findUnique({
      where: { name },
    });

    return status;
  }
  async create(data: Prisma.StatusCreateInput) {
    const status = await prisma.status.create({
      data,
    });

    return status;
  }
}
