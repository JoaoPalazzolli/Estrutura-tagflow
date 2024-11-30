import { PrismaClient } from "@prisma/client";
import { Tag } from "../domains/Tags";
import { mappingTagToPrimasInput } from "../utils/Mapper";

const prisma = new PrismaClient();

export class TagRepository {

    async findByAgent(agent: string) {
        return prisma.$queryRaw`SELECT
            t.id,
            t.index,
            t.agent,
            t.tag,
            t.parent_index,
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', c.id,
                        'fromParentIndex', c.from_parent_index,
                        'count', c.count
                    )
                ) FILTER (WHERE c.id IS NOT NULL), '[]'
            ) AS counts
        FROM "Tag" AS t
        LEFT JOIN "Count" AS c ON c.tag_id = t.id
        WHERE t.agent = ${agent}
        GROUP BY t.id, t.index, t.agent, t.tag, t.parent_index;`;
    }

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
