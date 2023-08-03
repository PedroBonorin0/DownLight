import { Prisma, Status } from "@prisma/client";

export interface StatusRepository {
  create(data: Prisma.StatusCreateInput): Promise<Status>;
  findByName(name: string): Promise<Status | null>
  findAll(): Promise<Status[]>
}
