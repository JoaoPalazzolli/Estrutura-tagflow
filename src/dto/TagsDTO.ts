import { CountDTO } from "./CountDTO";

// receber do genesys
export interface createTagDTO {
    index: number;
    agent: string;
    tag: string;
    parentIndex: string;
    fromParentIndex: number;
}

// retornar
export interface TagDTO {
    id: Number;
    index: number;
    agent: string;
    tag: string;
    parentIndex: string;
    count: CountDTO;
}

