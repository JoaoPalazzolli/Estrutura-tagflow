export interface Tag {
    index: number;
    agent: string;
    tag: string;
    parentIndex: string;
    counts: Count[];
    children: Tag[];
}

export interface Count{
    fromParentIndex: number;
    count: number;
}

export default Tag;