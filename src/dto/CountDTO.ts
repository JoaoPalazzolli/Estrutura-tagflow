// receber do genesys
export interface incrementCountDTO {
    index: number;
    agent: string;
    fromParentIndex: number;
}

export interface CountDTO{
    id?: Number;
    fromParentIndex: number;
    count: number;
}
