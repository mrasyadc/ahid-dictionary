import { Badge, Box, Link,Table } from '@chakra-ui/react';
import React from 'react';

import { SIMILARITY_COLOR } from '@/constants';
import { SearchQuery } from '@/utils/parseSearch';

interface DiseaseTableProps {
  data: { disease1: string; disease2: string; similarity: number }[];
  query: SearchQuery;
}

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

const DiseaseTable: React.FC<DiseaseTableProps> = ({ data, query }) => {
  // Returns true if this specific cell's text should be pushed back
  const isDimmed = (text: string): boolean => {
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
          {data.map((item, index) => {
            const dimmed1 = isDimmed(item.disease1);
            const dimmed2 = isDimmed(item.disease2);
            
            let fontWeight1 = 'normal';
            if (!dimmed1 && hasSearch) {
              fontWeight1 = 'medium';
            }
            
            let fontWeight2 = 'normal';
            if (!dimmed2 && hasSearch) {
              fontWeight2 = 'medium';
            }

            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Link 
                    href={`/disease/${encodeURIComponent(item.disease1)}`}
                    color={dimmed1 ? 'fg.muted' : 'fg'}
                    opacity={dimmed1 ? 0.75 : 1}
                    fontWeight={fontWeight1}
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
                    color={dimmed2 ? 'fg.muted' : 'fg'}
                    opacity={dimmed2 ? 0.75 : 1}
                    fontWeight={fontWeight2}
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
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default DiseaseTable;
