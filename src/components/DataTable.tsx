import { Steps, Table } from "@chakra-ui/react";

import TextPopover from "./TextPopover";

export default function DataTable({ disease, isEnglish }: any) {
  if (!disease || !disease["original_text"]) return null;
  const attributes = Object.keys(disease["original_text"]);
  return (
    <Table.Root variant="line" marginTop={6}>
      <Table.Caption>
        Atlas of Human Infectious Diseases Quick Summary
      </Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>{isEnglish ? "Subjects" : "Subjek"}</Table.ColumnHeader>
          <Table.ColumnHeader>
            {isEnglish ? "Quick Description (AI)" : "Penjelasan Singkat (AI)"}
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {attributes.map((attr) => {
          return (
            <Table.Row key={attr}>
              <Table.Cell width={"21ch"}>
                {attr}
                <TextPopover
                  attr={attr}
                  text={disease?.["original_text"][attr]}
                />
              </Table.Cell>
              <Table.Cell _firstLetter={{ textTransform: "capitalize" }}>
                {disease?.["summarize_text"][attr] == "NaN"
                  ? "-"
                  : disease?.["summarize_text"][attr]}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.ColumnHeader>Subjects</Table.ColumnHeader>
          <Table.ColumnHeader>Quick Description</Table.ColumnHeader>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
