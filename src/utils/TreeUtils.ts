import Tag from "../domains/Tags";

export function buildTree(data: Tag[]): any[] {
    const nameMapping: { [key: string]: any } = {};
    const rootNodes: any[] = [];

    // Cria todos os nós
    data.forEach(node => {
        nameMapping[node.index] = {
            index: node.index,
            name: node.tag,
            agent: node.agent,
            parentIndex: node.parentIndex,
            count: node.count,
            children: []
        };
    });

    // Conecta as tags aos pais
    data.forEach(node => {
        const treeNode = nameMapping[node.index];
        let parentIndex: any; 

        if (node.parentIndex && node.parentIndex.includes("|")) {
            parentIndex = splitManyParent(node.parentIndex);
        }

        if (node.parentIndex && !node.parentIndex.includes("|")) {
            parentIndex = nameMapping[Number(node.parentIndex)];
        }

        if (!parentIndex || parentIndex === 0) {
            // Nó raiz
            rootNodes.push(treeNode);
        } else if (Array.isArray(parentIndex)) {
            // Caso especial: múltiplos pais
            parentIndex.forEach(parentTag => {
                const parent = nameMapping[Number(parentTag.trim())];
                if (parent) {
                    const clonedNode = { ...treeNode, children: [...treeNode.children] };
                    parent.children.push(clonedNode);
                }
            });
        } else {
            // Nó com um único pai
            if (parentIndex) {
                parentIndex.children.push(treeNode);
            }
        }
    });

    return rootNodes;
}

function splitManyParent(data: String) {
    return data.split("|");
}

export default buildTree;