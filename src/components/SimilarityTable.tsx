import React from 'react';
import { Steps, Table, Box } from '@chakra-ui/react';

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
              <Table.Cell>{item.similarity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default DiseaseTable;
