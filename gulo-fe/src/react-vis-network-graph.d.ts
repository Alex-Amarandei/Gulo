declare module 'react-vis-network-graph' {
  import { Component } from 'react';
  import { DataSet, Edge, Network, NetworkEvents, Node, Options } from 'vis';

  export { DataSet, Edge, Network, NetworkEvents, Node, Options } from 'vis';

  export interface graphEvents {
    [event: NetworkEvents]: (params?: any) => void;
  }

  export interface graphData {
    nodes: Node[];
    edges: Edge[];
  }

  export interface NetworkGraphProps {
    graph: graphData;
    options?: Options;
    events?: graphEvents;
    getNetwork?: (network: Network) => void;
    identifier?: string;
    style?: React.CSSProperties;
    getNodes?: (nodes: DataSet) => void;
    getEdges?: (edges: DataSet) => void;
  }

  export interface NetworkGraphState {
    identifier: string;
  }

  export default class NetworkGraph extends Component<NetworkGraphProps, NetworkGraphState> {
    render();
  }
}
