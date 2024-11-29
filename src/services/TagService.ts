import { Request, Response } from 'express';
import { Tag } from '../domains/Tags';
import { createTagDTO, TagDTO } from '../dto/TagsDTO';
import { TagRepository } from '../repositories/TagRepository';
import { CountRepository } from '../repositories/CountRepository';
import { mappingToTag } from '../utils/Mapper';
import { Count } from '../domains/Count';

const tagRepository = new TagRepository();
const countRepository = new CountRepository();

async function findByAgent(req: Request, res: Response) {
    try {
        const agent = req.params.agent;
        // const db = await connection();
        // const collection = db.collection(environments.DATABASE_COLLECTION);

        // // Buscar documentos da coleção
        // const documents = await collection.find({ "agent": agent }).toArray();

        // const tags = mapearTags(documents);

        // // Construir a árvore usando a função buildTree
        // const tree = buildTree(tags);

        // res.json(tree);
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

        const tag = await tagRepository.createTag(mappingToTag(dto));

        const count: Count = {
            count: 1,
            fromParentIndex: dto.fromParentIndex,
            tag: tag
        }

        await countRepository.createCount(count);

        // Verifica se a tag já existe para realizar a atualização do count
        // const existingTag = await collection.findOne({ "index": tag.index, "agent": tag.agent });

        // if (existingTag) {
        //     // Se a tag já existir, incrementa o campo count e atualiza outros campos relevantes
        //     await collection.updateOne(
        //         { "index": tag.index, "agent": tag.agent },
        //         {
        //             $inc: { count: 1 },
        //             $set: {
        //                 tag: tag.tag,
        //                 parentIndex: tag.parentIndex // Atualiza parentIndex se houver mudança
        //             }
        //         }
        //     );
        // } else {
        //     // Se a tag não existir, cria um novo documento com count igual a 1
        //     tag.count = 1;
        //     await collection.insertOne(tag);
        // }

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
