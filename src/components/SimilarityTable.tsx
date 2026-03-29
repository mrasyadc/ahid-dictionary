import React from 'react';
import { Steps, Table, Box, Badge, HStack, Text, Link } from '@chakra-ui/react';
import { SIMILARITY_COLOR } from '@/src/constants';
import { SearchQuery } from '@/src/utils/parseSearch';

interface DiseaseTableProps {
  data: { disease1: string; disease2: string; similarity: number }[];
  query: SearchQuery;
}

const DiseaseTable: React.FC<DiseaseTableProps> = ({ data, query }) => {
  // Returns true if this specific cell's text should be pushed back
  const isDimmed = (text: string, role?: 'termA' | 'termB'): boolean => {
    if (query.mode === 'empty') return false;
    const lower = text.toLowerCase();
    if (query.mode === 'single') return !lower.includes(query.term.toLowerCase());
    if (query.mode === 'multi') return !query.terms.some(t => lower.includes(t.toLowerCase()));
    if (query.mode === 'pair') {
      // In pair mode, dim disease1 if it matches neither termA nor termB
      const matchesA = lower.includes(query.termA.toLowerCase());
      const matchesB = lower.includes(query.termB.toLowerCase());
      return !matchesA && !matchesB;
    }
    return false;
  };

  const hasSearch = query.mode !== 'empty';

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
                  fontWeight={isDimmed(item.disease1) ? 'normal' : hasSearch ? 'medium' : 'normal'}
                  transition="all 0.2s"
                  _hover={{ color: SIMILARITY_COLOR, textDecoration: 'underline', textDecorationColor: SIMILARITY_COLOR }}
                  _focusVisible={{ outline: 'none' }}
                >
                  {item.disease1}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link 
                  href={`/disease/${encodeURIComponent(item.disease2)}`}
                  color={isDimmed(item.disease2) ? 'fg.muted' : 'fg'}
                  opacity={isDimmed(item.disease2) ? 0.75 : 1}
                  fontWeight={isDimmed(item.disease2) ? 'normal' : hasSearch ? 'medium' : 'normal'}
                  transition="all 0.2s"
                  _hover={{ color: SIMILARITY_COLOR, textDecoration: 'underline', textDecorationColor: SIMILARITY_COLOR }}
                  _focusVisible={{ outline: 'none' }}
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
