export interface Tag {
    index: number
    agent: string
    tag: string
    children: Tag[]
    parentIndex: string
    count: number
} 

export default Tag;