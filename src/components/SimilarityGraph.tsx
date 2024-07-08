// src/NetworkGraph.tsx
import React, { useRef, useEffect, memo } from 'react';
import * as d3 from 'd3';
import { Tooltip, useColorMode } from '@chakra-ui/react'

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Node {
  id: string;
}

interface NetworkGraphProps {
  data: {
    disease1: string;
    disease2: string;
    similarity: number;
  }[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!data) return;

    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current)
    .call(d3.zoom().on('zoom', (event) => {
        svg.attr('transform', event.transform);
      }));
    const width = 600;
    const height = 400;
    const center = {
        x: width / 2,
        y: height / 2
      };

    const nodes = Array.from(new Set(data.flatMap(d => [d.disease1, d.disease2])))
      .map(d => ({ id: d }));

    const links: Link[] = data.map(d => ({
      source: d.disease1,
      target: d.disease2,
      value: +d.similarity
    }));

    const scale = d3.scalePoint()
      .domain(nodes.map(d => d.id))
      .range([0, 2 * Math.PI]);

    nodes.forEach((node, index) => {
      const angle = scale(node.id);
      node.x = center.x + Math.cos(angle) * width / 3;
      node.y = center.y + Math.sin(angle) * height / 3;
    });

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(center.x, center.y));

      const zoomBehavior = d3.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        svg.select('.graph-container')
          .attr('transform', event.transform);
      });

    const graphcontainer = svg.append('g')
      .attr('class', 'graph-container');

    const link = graphcontainer.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .style('stroke-width', d => {
        const scale = d3.scaleLinear()
          .domain([0, 1])
          .range([1, 20]);
        return scale(d.value);
      });

    const linkLabels = graphcontainer.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(links)
      .enter().append('text')
      .attr('dy', '0.35em')
      .style('fill', colorMode === 'dark' ? '#fff' : '#000')
      .style('font-size', '12px')
      .text(d => d.value.toFixed(2));

    const label = graphcontainer.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('dy', -10)
      .attr('dx', 10)
      .text(d => d.id)
      .style('fill', colorMode === 'dark' ? 'rgb(255, 255, 255, 0.92)' : 'rgb(0, 0, 0, 0.92)')
      .style('pointer-events', 'none');

    const node = graphcontainer.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
        );

    node.append('title')
      .text(d => d.id);

    svg.call(zoomBehavior);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);

      linkLabels
        .attr('x', d => ((d.source as any).x + (d.target as any).x) / 2)
        .attr('y', d => ((d.source as any).y + (d.target as any).y) / 2);

      label
        .attr('x', d => (d as any).x)
        .attr('y', d => (d as any).y);
    });

    function mouseover(this: any) {
      d3.select(this).style('cursor', 'pointer');
    }

    function mouseout(this: any) {
      d3.select(this).style('cursor', 'default');
    }

    function dragstarted(event: d3.DragEvent<SVGCircleElement>, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
  
    function dragged(event: d3.DragEvent<SVGCircleElement>, d: any) {
        d.fx = event.x;
        d.fy = event.y;
    }
  
    function dragended(event: d3.DragEvent<SVGCircleElement>, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

  }, [data, colorMode]);

  return (
    <svg ref={svgRef} width="600" height="400" style={{ margin: '0', display: 'block' }}>
      <rect fill="none" pointerEvents="all" />
      <g className="graph-container" />
    </svg>
  );
};

export default memo(NetworkGraph);
