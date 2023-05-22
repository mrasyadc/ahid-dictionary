import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot
} from "@chakra-ui/react";

export default function DataTable(): JSX.Element {
  return (
    <TableContainer marginTop={10}>
      <Table variant="simple">
        <TableCaption>
          Atlas of Human Infectious Diseases Quick Summary
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Subjects</Th>
            <Th>Quick Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Disease</Td>
            <Td>Botulism</Td>
          </Tr>
          <Tr>
            <Td>Classification</Td>
            <Td>ICD-9 005.1; ICD-10 A05.1</Td>
          </Tr>
          <Tr>
            <Td>Syndromes and synonyms</Td>
            <Td>
              Botulinum toxin, produced by the anerobic sporeforming bacterium
              Clostridium botulinum types A, B, E and rarely F.
            </Td>
          </Tr>
          <Tr>
            <Td>Reservoir</Td>
            <Td overflowX={"hidden"}>
              C. botulinum spores are found in soil, dust, honey, marine
              sediments, and in intestines of fish and land animals.
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Subjects</Th>
            <Th>Quick Description</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
