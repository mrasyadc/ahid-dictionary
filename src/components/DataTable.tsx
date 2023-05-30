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

export default function DataTable({ disease }: any): JSX.Element {
  const attributes = Object.keys(disease["original_text"]);
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
        {attributes.map((attr) => {
          return (
            <Tr key={attr}>
              <Td width={"21ch"}>
                {attr}
                <TextPopover
                  attr={attr}
                  text={disease?.["original_text"][attr]}
                />
              </Td>
              <Td>
                {disease?.["summarize_text"][attr] == "NaN"
                  ? "-"
                  : disease?.["summarize_text"][attr]}
              </Td>
            </Tr>
          );
        })}
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
