import { CountDTO } from "./CountDTO";

// receber do front
export interface createTagDTO {
    index: number;
    agent: string;
    tag: string;
    parentIndex: string;
}

// retornar
export interface TagDTO {
    id: number;
    index: number;
    agent: string;
    tag: string;
    parentIndex: string;
    counts?: CountDTO[];
}

