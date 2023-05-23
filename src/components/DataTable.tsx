import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

import TextPopover from "./TextPopover";

export default function DataTable(): JSX.Element {
  return (
    <Table variant="simple" marginTop={6}>
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
          <Td>
            Disease
            <TextPopover text={"Botulism"} />
          </Td>
          <Td>Botulism</Td>
        </Tr>
        <Tr>
          <Td>
            Classification <TextPopover text={"ICD-9 005.1; ICD-10 A05.1"} />
          </Td>
          <Td>ICD-9 005.1; ICD-10 A05.1</Td>
        </Tr>
        <Tr>
          <Td>
            Syndromes and synonyms{" "}
            <TextPopover
              text={
                "Botulinum toxin, produced by the anerobic sporeforming bacterium Clostridium botulinum types A, B, E and rarely F."
              }
            />
          </Td>
          <Td>
            Botulinum toxin, produced by the anerobic sporeforming bacterium
            Clostridium botulinum types A, B, E and rarely F.
          </Td>
        </Tr>
        <Tr>
          <Td>
            Reservoir
            <TextPopover
              text={
                "C. botulinum spores are found in soil, dust, honey, marine sediments, and in intestines of fish and land animals."
              }
            />
          </Td>
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
  );
}
