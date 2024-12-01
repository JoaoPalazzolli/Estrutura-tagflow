import { Request, Response } from 'express';
import { Tag } from '../domains/Tags';
import { createTagDTO } from '../dto/TagsDTO';
import { TagRepository } from '../repositories/TagRepository';
import { CountRepository } from '../repositories/CountRepository';
import { mappingToTag } from '../utils/Mapper';
import { Count } from '../domains/Count';

const tagRepository = new TagRepository();
const countRepository = new CountRepository();

async function findByAgent(req: Request, res: Response) {
    try {
        const agent = req.params.agent;
        
        const tag = await tagRepository.findByAgent(agent);

        res.json(tag);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).send("Erro ao buscar dados");
    }
}

async function createTag(req: Request, res: Response) {
    try {
        const dto: createTagDTO = req.body;

        // const db = await connection();
        // const collection = db.collection(environments.DATABASE_COLLECTION);

        if (!isValidTag(dto)) {
            res.status(400).json({ message: "A tag não pode ser seu próprio pai" });
            return;
        }

        const document = await tagRepository.createTag(mappingToTag(dto));

        const tag: Tag = mappingToTag(document);

        tag.parentIndex.split("|").forEach(async t => {
            const count: Count = {
                count: 0,
                fromParentIndex: Number(t),
                tag: tag
            }

            await countRepository.createCount(count);
        })

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao criar ou atualizar tag:", error);
        res.status(500).send("Erro ao criar ou atualizar tag");
    }
}



async function isUpdate(tag: Tag) {
    // const db = await connection();
    // const collection = db.collection(environments.DATABASE_COLLECTION);

    // const document = await collection.findOne({ "index": tag.index, "agent": tag.agent });

    // return !!document; // Retorna true se o documento existir, false caso contrário
}

function isValidTag(tag: createTagDTO) {
    // A tag não pode ser seu próprio pai
    if (!tag) {
        return false;
    }

    if (tag.parentIndex.includes(tag.index.toString())) {
        return false;
    }

    return true;
}



export default { createTag, findByAgent };
