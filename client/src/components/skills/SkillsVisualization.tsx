import { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import { motion } from 'framer-motion';

interface SkillNode {
  id: string;
  name: string;
  val: number; // size based on level
  color: string;
  category: string;
  level: number;
  x?: number;
  y?: number;
  z?: number;
}

interface SkillLink {
  source: string;
  target: string;
  value: number;
}

interface GraphData {
  nodes: SkillNode[];
  links: SkillLink[];
}

interface SkillsVisualizationProps {
  skills: {
    name: string;
    level: number;
    category: string;
    description: string;
    icon: string;
  }[];
}

const SkillsVisualization = ({ skills }: SkillsVisualizationProps) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: 600 });
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const graphRef = useRef(null);

  // Category colors
  const categoryColors: Record<string, string> = {
    Frontend: '#38bdf8', // Light blue
    Backend: '#fb923c', // Orange
    DevOps: '#a78bfa', // Purple
    Database: '#4ade80', // Green
    Mobile: '#f472b6', // Pink
    Other: '#94a3b8', // Gray
  };

  useEffect(() => {
    // Create nodes from skills
    const nodes: SkillNode[] = skills.map(skill => ({
      id: skill.name,
      name: skill.name,
      val: skill.level * 1.5, // Size based on level
      color: categoryColors[skill.category] || '#94a3b8',
      category: skill.category,
      level: skill.level
    }));

    // Create links between related skills within the same category
    const links: SkillLink[] = [];
    
    // Connect skills in the same category
    skills.forEach(skill => {
      const similarSkills = skills.filter(s => 
        s.category === skill.category && s.name !== skill.name
      );
      
      similarSkills.forEach(similarSkill => {
        // Only create links between certain pairs to avoid too many connections
        const shouldLink = Math.random() > 0.5;
        if (shouldLink) {
          links.push({
            source: skill.name,
            target: similarSkill.name,
            value: 1
          });
        }
      });
    });

    // Connect some cross-category skills (e.g., React with Node.js)
    const crossCategoryConnections = [
      { source: 'React', target: 'Node.js' },
      { source: 'JavaScript', target: 'Express' },
      { source: 'MongoDB', target: 'Express' },
      { source: 'React', target: 'Redux' },
      { source: 'TypeScript', target: 'React' },
      { source: 'Node.js', target: 'Express' },
      { source: 'Docker', target: 'AWS' },
    ];

    crossCategoryConnections.forEach(connection => {
      const sourceExists = skills.some(skill => skill.name === connection.source);
      const targetExists = skills.some(skill => skill.name === connection.target);
      
      if (sourceExists && targetExists) {
        links.push({
          source: connection.source,
          target: connection.target,
          value: 2
        });
      }
    });

    setGraphData({ nodes, links });

    // Handle resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth > 1200 ? 1000 : window.innerWidth - 50,
        height: 600
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [skills]);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
    setShowInfo(true);
    
    if (graphRef.current) {
      const graph = graphRef.current as any;
      // Focus on the clicked node
      graph.centerAt(node.x, node.y, node.z);
      graph.zoom(1.5, 800);
    }
  };

  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Skills Network
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore how my skills connect and complement each other. Click on any node to learn more.
          <br />
          <span className="text-sm italic">Drag to rotate, scroll to zoom, and drag nodes to interact</span>
        </p>
      </motion.div>

      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-hidden">
        <div className="flex justify-center" style={{ height: dimensions.height }}>
          {graphData.nodes.length > 0 && (
            <ForceGraph3D
              ref={graphRef}
              graphData={graphData}
              nodeLabel="name"
              nodeColor="color"
              nodeVal="val"
              linkWidth={1}
              linkOpacity={0.5}
              backgroundColor="rgba(0,0,0,0)"
              width={dimensions.width}
              height={dimensions.height}
              nodeResolution={16}
              onNodeClick={(node: any) => handleNodeClick(node as SkillNode)}
              nodeThreeObject={(node: any) => {
                const sprite = new SpriteText(node.name);
                sprite.color = node.color;
                sprite.textHeight = 4;
                sprite.backgroundColor = 'rgba(0,0,0,0.2)';
                sprite.padding = 2;
                sprite.borderRadius = 4;
                return sprite;
              }}
              linkThreeObjectExtend={true}
              linkCurvature={0.25}
              cooldownTicks={100}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={1.5}
              linkDirectionalParticleSpeed={0.01}
            />
          )}
        </div>

        {/* Skill Information Panel */}
        {selectedNode && showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-xs w-full"
          >
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
            <h4 className="font-bold text-lg mb-1" style={{ color: selectedNode.color }}>
              {selectedNode.name}
            </h4>
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Category: {selectedNode.category}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${(selectedNode.level / 5) * 100}%`,
                  backgroundColor: selectedNode.color
                }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {skills.find(skill => skill.name === selectedNode.name)?.description || ''}
            </p>
          </motion.div>
        )}

        {/* Category Legend */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-md">
          <h4 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">Categories</h4>
          <div className="flex flex-col gap-1">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-gray-700 dark:text-gray-300">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsVisualization; 