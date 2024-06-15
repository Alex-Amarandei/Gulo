import { Edge, Node } from 'react-vis-network-graph';

export const findConnectedComponents = (nodes: Node[], edges: Edge[]): Node[][] => {
  const visited = new Set<string>();
  const components: Node[][] = [];

  const dfs = (nodeId: string, component: Node[]) => {
    visited.add(nodeId);
    component.push(nodes.find(node => node.id === nodeId)!);

    edges.forEach(edge => {
      if (edge.from === nodeId && !visited.has(String(edge.to))) {
        dfs(String(edge.to), component);
      } else if (edge.to === nodeId && !visited.has(String(edge.from))) {
        dfs(String(edge.from), component);
      }
    });
  };

  nodes.forEach(node => {
    if (!visited.has(String(node.id))) {
      const component: Node[] = [];
      dfs(String(node.id), component);
      components.push(component);
    }
  });

  return components;
};
