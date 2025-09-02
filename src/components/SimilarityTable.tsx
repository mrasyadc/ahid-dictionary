import React from 'react';
import { Box } from '@chakra-ui/react';

interface DiseaseTableProps {
  data: { disease1: string; disease2: string; similarity: number }[];
  searchTerm: string;
}

const DiseaseTable: React.FC<DiseaseTableProps> = ({ data, searchTerm }) => {
  const matchSearchTerm = (text: string): boolean => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <Box>
      <Box 
        as="table" 
        width="100%" 
        borderCollapse="collapse"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Box as="thead" backgroundColor="gray.50">
          <Box as="tr">
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderBottomWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              Disease 1
            </Box>
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderBottomWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              Disease 2
            </Box>
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderBottomWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              Similarity
            </Box>
          </Box>
        </Box>
        <Box as="tbody">
          {data.map((item, index) => (
            <Box as="tr" key={index} _hover={{ backgroundColor: "gray.50" }}>
              <Box 
                as="td" 
                padding={4} 
                borderBottomWidth="1px"
                borderColor="gray.200"
                fontWeight={matchSearchTerm(item.disease1) ? "bold" : "normal"}
              >
                {item.disease1}
              </Box>
              <Box 
                as="td" 
                padding={4} 
                borderBottomWidth="1px"
                borderColor="gray.200"
                fontWeight={matchSearchTerm(item.disease2) ? "bold" : "normal"}
              >
                {item.disease2}
              </Box>
              <Box 
                as="td" 
                padding={4} 
                borderBottomWidth="1px"
                borderColor="gray.200"
              >
                {item.similarity}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiseaseTable;
