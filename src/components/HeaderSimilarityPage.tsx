import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading, Link, Text } from "@chakra-ui/react";

export default function SimilarityPageHeader() {
  return (
    <>
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Atlas of Human Infectious Disease
      </Heading>
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Dictionary
      </Heading>
      <Text textAlign={"center"}>
        Thesis Supervisor 1{" "}
        <Link
          href="https://scholar.google.co.id/citations?user=f2_71Q8AAAAJ&hl=en"
          isExternal
        >
          Retno Aulia Vinarti, S.Kom., M.Kom., Ph.D.{" "}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Thesis Supervisor 2{" "}
        <Link
          href="https://scholar.google.com/citations?user=WuDASG4AAAAJ&hl=en"
          isExternal
        >
          Faizal Mahananto, S.Kom., M.Eng., Ph.D. <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text textAlign={"center"}>
        App and Design by{" "}
        <Link href="https://www.showwcase.com/mrasyadc" isExternal>
          Muhammad Rasyad Caesarardhi <ExternalLinkIcon mx="2px" />
        </Link>
        and{" "}
        <Link href="https://www.github.com/dianizzah" isExternal>
          Dian Nizzah Fortuna <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Disease similarity score computed using{" "}
        <Link href="https://doi.org/10.1093/bioinformatics/btx238" isExternal>
        BIOSSES: a Semantic Sentence Similarity Estimation System for the Biomedical Domain{" "}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Original data provided by{" "}
        <Link
          href="https://onlinelibrary.wiley.com/doi/book/10.1002/9781444354690"
          isExternal
        >
          Atlas of Human Infectious Diseases <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </>
  );
}
