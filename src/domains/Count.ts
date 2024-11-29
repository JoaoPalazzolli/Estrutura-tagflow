import { Tag } from "./Tags";

export interface Count{
    id?: number;
    fromParentIndex: number;
    count: number;
    tag: Tag
}