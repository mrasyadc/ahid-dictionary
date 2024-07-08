import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Box } from '@chakra-ui/react';

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
      <Table>
        <Thead>
          <Tr>
            <Th>Disease 1</Th>
            <Th>Disease 2</Th>
            <Th>Similarity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td style={matchSearchTerm(item.disease1) ? highlightStyle : {}}>
                {item.disease1}
              </Td>
              <Td style={matchSearchTerm(item.disease2) ? highlightStyle : {}}>
                {item.disease2}
              </Td>
              <Td>{item.similarity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DiseaseTable;
