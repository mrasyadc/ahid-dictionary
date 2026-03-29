import React from 'react';
import { Steps, Table, Box, Badge, HStack, Text, Link } from '@chakra-ui/react';
import { SIMILARITY_COLOR } from '@/src/constants';

interface DiseaseTableProps {
  data: { disease1: string; disease2: string; similarity: number }[];
  searchTerm: string;
}

const DiseaseTable: React.FC<DiseaseTableProps> = ({ data, searchTerm }) => {
  const isDimmed = (text: string): boolean => {
    // If there's no search term, nothing is dimmed (everything is 'fg')
    if (!searchTerm || searchTerm.trim() === '') return false;
    // Dim the text only if it does NOT match the search term
    return !text.toLowerCase().includes(searchTerm.toLowerCase());
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
              <Table.Cell>
                <Link 
                  href={`/disease/${encodeURIComponent(item.disease1)}`}
                  color={isDimmed(item.disease1) ? 'fg.muted' : 'fg'}
                  opacity={isDimmed(item.disease1) ? 0.75 : 1}
                  fontWeight={isDimmed(item.disease1) ? 'normal' : searchTerm ? 'medium' : 'normal'}
                  transition="all 0.2s"
                  _hover={{ textDecoration: 'underline', textDecorationColor: 'gray.400' }}
                >
                  {item.disease1}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link 
                  href={`/disease/${encodeURIComponent(item.disease2)}`}
                  color={isDimmed(item.disease2) ? 'fg.muted' : 'fg'}
                  opacity={isDimmed(item.disease2) ? 0.75 : 1}
                  fontWeight={isDimmed(item.disease2) ? 'normal' : searchTerm ? 'medium' : 'normal'}
                  transition="all 0.2s"
                  _hover={{ textDecoration: 'underline', textDecorationColor: 'gray.400' }}
                >
                  {item.disease2}
                </Link>
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
