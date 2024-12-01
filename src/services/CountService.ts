import { incrementCountDTO } from "../dto/CountDTO";
import { Request, Response } from 'express';
import { CountRepository } from "../repositories/CountRepository";

const countRepository = new CountRepository();

async function incrementCount(req: Request, res: Response) {
    try {
        const dto: incrementCountDTO = req.body;

        countRepository.incrementCountByAgentAndIndexAndFromParentIndex(dto.agent, dto.index, dto.fromParentIndex);

        res.status(200).send();
    } catch (error) {
        console.error("Erro ao criar ou atualizar tag:", error);
        res.status(500).send("Erro ao criar ou atualizar tag");
    }
}

export default { incrementCount }