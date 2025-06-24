declare module 'react-force-graph-3d' {
  import * as React from 'react';

  interface NodeObject {
    id: string;
    [key: string]: any;
  }

  interface LinkObject {
    source: string | NodeObject;
    target: string | NodeObject;
    [key: string]: any;
  }

  interface GraphData {
    nodes: NodeObject[];
    links: LinkObject[];
  }

  interface ForceGraph3DProps {
    graphData: GraphData;
    width?: number;
    height?: number;
    backgroundColor?: string;
    nodeLabel?: string | ((node: NodeObject) => string);
    nodeColor?: string | ((node: NodeObject) => string);
    nodeVal?: string | number | ((node: NodeObject) => number);
    linkWidth?: number | ((link: LinkObject) => number);
    linkOpacity?: number;
    linkDirectionalParticles?: number | ((link: LinkObject) => number);
    linkDirectionalParticleWidth?: number | ((link: LinkObject) => number);
    linkDirectionalParticleSpeed?: number | ((link: LinkObject) => number);
    nodeThreeObject?: (node: NodeObject) => any;
    linkThreeObjectExtend?: boolean;
    linkCurvature?: number | ((link: LinkObject) => number);
    cooldownTicks?: number;
    onNodeClick?: (node: NodeObject) => void;
    centerAt?: (x: number, y: number, z: number) => void;
    zoom?: (value: number, duration?: number) => void;
    [key: string]: any;
  }

  const ForceGraph3D: React.ForwardRefExoticComponent<
    ForceGraph3DProps & React.RefAttributes<any>
  >;

  export default ForceGraph3D;
} 