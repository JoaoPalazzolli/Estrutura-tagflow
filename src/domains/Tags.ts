export interface Tag {
    index: number;
    agent: string;
    tag: string;
    parentIndex: string;
    fromParentIndex?: number; // Propriedade opcional para especificar o pai
    count: number;
    paths?: { [key: string]: number }; // Adicionado para rastrear contagens por caminho
    children: Tag[];
}

export default Tag;