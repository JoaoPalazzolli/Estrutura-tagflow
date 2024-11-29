import { Count } from "../domains/Count";
import { Tag } from "../domains/Tags";

export function mappingToTag(document: any): Tag {
    return {
        id: document.id,
        index: document.index,
        tag: document.tag,
        agent: document.agent,
        parentIndex: document.parentIndex
    };
}

export function mappingCountToPrimasInput(data: Count) {
    return {
        count: data.count,
        fromParentIndex: data.fromParentIndex,
        tagId: data.tag.id
    }
}

export function mappingTagToPrimasInput(data: Tag) {
    return {
        index: data.index,
        tag: data.tag,
        agent: data.agent,
        parentIndex: data.parentIndex
    }
}