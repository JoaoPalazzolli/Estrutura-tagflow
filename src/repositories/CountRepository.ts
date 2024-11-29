import { PrismaClient } from "@prisma/client";
import { Count } from "../domains/Count";
import { mappingCountToPrimasInput } from "../utils/Mapper";

const prisma = new PrismaClient();

export class CountRepository {
  async createCount(data: Count) {
    const prismaData = mappingCountToPrimasInput(data);
    return prisma.count.create( { data: prismaData } )
  }

  async findTagById(id: number) {
    return prisma.count.findUnique({ where: { id } });
  }

  async updateCount(id: number, data: Count) {
    const prismaData = mappingCountToPrimasInput(data);
    return prisma.count.update({ where: { id }, data: prismaData});
  }

  async deleteCount(id: number) {
    return prisma.count.delete({ where: { id } });
  }

  
}
