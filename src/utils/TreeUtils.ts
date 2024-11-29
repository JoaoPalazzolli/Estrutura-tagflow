// import Tag from "../domains/Tags";

// export function buildTree(data: Tag[]): any[] {
//     const nameMapping: { [key: string]: any } = {};
//     const rootNodes: any[] = [];

//     // Criar todos os nós e mapear pelo índice
//     data.forEach((node) => {
//         if (!nameMapping[node.index]) {
//             nameMapping[node.index] = {
//                 index: node.index,
//                 name: node.tag,
//                 agent: node.agent,
//                 parentIndex: node.parentIndex,
//                 count: node.count,
//                 children: []
//             };
//         } else {
//             // Se o nó já existir, apenas atualize o count e outros dados relevantes
//             nameMapping[node.index].count += node.count;
//             nameMapping[node.index].parentIndex = node.parentIndex; // Atualiza parentIndex se necessário
//         }
//     });

//     // Conectar nós aos seus pais
//     data.forEach((node) => {
//         const treeNode = nameMapping[node.index];
//         let parentIndices: string[] = [];

//         // Lidar com múltiplos pais
//         if (node.parentIndex && node.parentIndex.includes("|")) {
//             parentIndices = node.parentIndex.split("|").map((id) => id.trim());
//         } else if (node.parentIndex) {
//             parentIndices = [node.parentIndex];
//         }

//         // Adicionar o nó ao seu(s) pai(s)
//         if (parentIndices.length === 0) {
//             // Caso sem pai (nó raiz)
//             rootNodes.push(treeNode);
//         } else {
//             parentIndices.forEach((parentId) => {
//                 const parent = nameMapping[parentId];
//                 if (parent) {
//                     // Garante que a tag não seja adicionada como filha mais de uma vez
//                     const existingChild = parent.children.find((child: any) => child.index === treeNode.index);
//                     if (!existingChild) {
//                         parent.children.push(treeNode);
//                     }
//                 }
//             });
//         }
//     });

//     return rootNodes;
// }

// export default buildTree;
