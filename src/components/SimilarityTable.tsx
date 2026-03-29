import React from 'react';
import { Steps, Table, Box, Progress, HStack, Text } from '@chakra-ui/react';
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

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Disease 1</Table.ColumnHeader>
            <Table.ColumnHeader>Disease 2</Table.ColumnHeader>
            <Table.ColumnHeader>Similarity</Table.ColumnHeader>
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
              <Table.Cell>
                <HStack gap={4}>
                  <Progress.Root 
                    value={item.similarity * 100} 
                    width="120px" 
                  >
                    <Progress.Track>
                      <Progress.Range bg={SIMILARITY_COLOR} />
                    </Progress.Track>
                  </Progress.Root>
                  <Text>{(item.similarity * 100).toFixed(1)}%</Text>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default DiseaseTable;
