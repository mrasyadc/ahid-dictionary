import React from 'react';
import { Steps, Table, Box, Badge, HStack, Text } from '@chakra-ui/react';
import { SIMILARITY_COLOR } from '@/src/constants';

interface DiseaseTableProps {
  data: { disease1: string; disease2: string; similarity: number }[];
  searchTerm: string;
}

const DiseaseTable: React.FC<DiseaseTableProps> = ({ data, searchTerm }) => {
  const highlightStyle = {
    fontWeight: 'bold',
  };

  const matchSearchTerm = (text: string): boolean => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Mathematically interpolate the color using pure RGB blending
  const getContinuousColor = (similarity: number) => {
    const normalized = Math.max(0, Math.min(similarity / 0.6, 1));
    
    // Exact RGB values for D3 Teal (#69b3a2) are (105, 179, 162)
    // Exact RGB values for bright Red are roughly (255, 60, 60)
    const r = Math.round(105 + (255 - 105) * normalized);
    const g = Math.round(179 + (60 - 179) * normalized);
    const b = Math.round(162 + (60 - 162) * normalized);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Disease 1</Table.ColumnHeader>
            <Table.ColumnHeader>Disease 2</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Similarity Score</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell style={matchSearchTerm(item.disease1) ? highlightStyle : {}}>
                {item.disease1}
              </Table.Cell>
              <Table.Cell style={matchSearchTerm(item.disease2) ? highlightStyle : {}}>
                {item.disease2}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Badge
                  bg={getContinuousColor(item.similarity)}
                  color="white"
                  variant="solid"
                  size="lg"
                  px={4}
                  py={1.5}
                  borderRadius="full"
                >
                  {(item.similarity * 100).toFixed(1)}%
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default DiseaseTable;
