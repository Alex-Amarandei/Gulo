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

export const OPTIMISED_GRAPH_OPTIONS = {
  nodes: {
    shape: 'dot',
    size: 5,
    font: {
      size: 12,
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
    borderWidth: 1,
  },
  edges: {
    width: 0.5,
    color: '#F1F5F9',
    smooth: {
      type: 'continuous',
      forceDirection: 'none',
      roundness: 0.2,
      enabled: true,
    },
    selectionWidth: 0.5,
    hoverWidth: 0.5,
    hidden: false,
  },
  physics: {
    enabled: true,
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springLength: 50,
      springConstant: 0.18,
      damping: 0.8,
      avoidOverlap: 0,
    },
    stabilization: {
      enabled: true,
      iterations: 100,
      updateInterval: 50,
      onlyDynamicEdges: false,
      fit: true,
    },
    maxVelocity: 30,
    minVelocity: 0.1,
    timestep: 0.8,
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
    improvedLayout: false,
  },
  manipulation: {
    enabled: false,
  },
};
