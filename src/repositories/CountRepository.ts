import { PrismaClient } from "@prisma/client";
import { Count } from "../domains/Count";
import { mappingCountToPrimasInput } from "../utils/Mapper";

const prisma = new PrismaClient();

export class CountRepository {

  async incrementCountByAgentAndIndexAndFromParentIndex(agent: string, index: number, fromParentIndex: number) {
    return prisma.$queryRaw`UPDATE "Count" AS c SET count = c.count + 1
      FROM "Tag" AS t WHERE t.id = c.tag_id
        AND t.agent = ${agent} AND t.index = ${index} AND c.from_parent_index = ${fromParentIndex}`;
  }

  async createCount(data: Count) {
    const prismaData = mappingCountToPrimasInput(data);
    return prisma.count.create({ data: prismaData })
  }

  async findTagById(id: number) {
    return prisma.count.findUnique({ where: { id } });
  }

  async updateCount(id: number, data: Count) {
    const prismaData = mappingCountToPrimasInput(data);
    return prisma.count.update({ where: { id }, data: prismaData });
  }

  async deleteCount(id: number) {
    return prisma.count.delete({ where: { id } });
  }


}
