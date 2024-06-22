export const GRAPH_OPTIONS = {
  nodes: {
    shape: 'dot',
    size: 16,
    font: {
      size: 14,
      color: '#F1F5F9',
    },
    color: {
      background: '#FABF52',
      border: '#F77725',
      highlight: {
        background: '#FABF52',
        border: '#F77725',
      },
      hover: {
        background: '#FABF52',
        border: '#F77725',
      },
    },
    borderWidth: 2,
  },
  edges: {
    width: 2,
    color: '#F1F5F9',
  },
  physics: {
    enabled: true,
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springLength: 100,
      springConstant: 0.08,
      damping: 0.4,
      avoidOverlap: 0,
    },
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 25,
      onlyDynamicEdges: false,
      fit: true,
    },
    timestep: 0.35,
    adaptiveTimestep: true,
  },
  interaction: {
    tooltipDelay: 300,
    hideEdgesOnDrag: true,
    hover: true,
    dragNodes: true,
    dragView: true,
    zoomView: true,
    keyboard: {
      enabled: true,
      speed: { x: 10, y: 10, zoom: 0.02 },
      bindToWindow: true,
    },
  },
  layout: {
    improvedLayout: true,
  },
  manipulation: {
    enabled: false,
  },
};
