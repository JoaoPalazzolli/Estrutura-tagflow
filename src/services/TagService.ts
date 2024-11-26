import { Request, Response } from 'express';
import Tag from '../domains/Tags';
import connection from '../infra/db/ConnectionDatabase';
import { buildTree } from '../utils/TreeUtils';
import environments from '../infra/configs/LoadEnvironment';

async function findByAgent(req: Request, res: Response){
    try {
        const agent = req.params.agent;
        const db = await connection();
        const collection = db.collection(environments.DATABASE_COLLECTION);

        // Buscar documentos da coleção
        const documents = await collection.find({ "agent": agent }).toArray();

        const tags = mapearTags(documents);

        // Construir a árvore usando a função buildTree
        const tree = buildTree(tags);

        res.json(tree);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).send("Erro ao buscar dados");
    }
}

async function createTag(req: Request, res: Response){
    try {
        const tag: Tag = req.body
        const db = await connection();
        const collection = db.collection(environments.DATABASE_COLLECTION);

        if(!validTag(tag)){
            res.status(400).json({ message: "A tag não pode ser seu próprio pai" });
            return;
        }

        if(await isUpdate(tag)){
            await collection.updateOne( { "index": tag.index, "agent": tag.agent }, {
                $set: tag, 
                $inc: { count: 1 }          
              } )
        } else{
            tag.count = 1;
            await collection.insertOne(tag);
        }

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).send("Erro ao buscar dados");
    }
}

async function isUpdate(tag: Tag){
    const db = await connection();
    const collection = db.collection(environments.DATABASE_COLLECTION);

    const document = await collection.findOne( { "index": tag.index, "agent": tag.agent } )

    if(!document){
        return false;
    }

    return true;
}

function validTag(tag: Tag){
    // a tag não pode ser seu próprio pai

    if(tag && tag.parentIndex.includes("|")){
        if(tag.parentIndex.includes(tag.index.toString())){
            return false;
        }
    }

    if(!tag || tag.index === Number(tag.parentIndex)){
        return false;
    }

    return true;
}

function mapearTags(documents: any[]): Tag[]{
    return documents.map((doc) => ({
        index: doc.index,
        agent: doc.agent,
        tag: doc.tag,
        parentIndex: doc.parentIndex,
        count: doc.count,
        children: []
    }));
}

export default {createTag, findByAgent};