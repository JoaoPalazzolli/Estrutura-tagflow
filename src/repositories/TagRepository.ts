import { PrismaClient } from "@prisma/client";
import { Tag } from "../domains/Tags";
import { mappingTagToPrimasInput } from "../utils/Mapper";

const prisma = new PrismaClient();

export class TagRepository {
    async createTag(data: Tag) {
        const prismaData = mappingTagToPrimasInput(data);
        return prisma.tag.create({ data: prismaData });
    }

    async findTagById(id: number) {
        return prisma.tag.findUnique({ where: { id } });
    }

    async updateTag(id: number, data: Tag) {
        const prismaData = mappingTagToPrimasInput(data);
        return prisma.tag.update({ where: { id }, data: prismaData });
    }

    async deleteTag(id: number) {
        return prisma.tag.delete({ where: { id } });
    }

}
