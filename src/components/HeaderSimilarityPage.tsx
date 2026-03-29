import { Heading, Icon,Link, Text } from "@chakra-ui/react";
import { LuExternalLink } from 'react-icons/lu';

export default function SimilarityPageHeader() {
  return (
    <>
      <Heading fontSize="3rem" fontWeight={700} as="h1" textAlign={"center"} lineHeight="1.2" mb={4}>
        Atlas of Human Infectious Disease<br/>Dictionary
      </Heading>
      <Text textAlign={"center"}>
        Thesis Supervisor 1{" "}
        <Link
          href="https://scholar.google.co.id/citations?user=f2_71Q8AAAAJ&hl=en"
          target='_blank'
          rel='noopener noreferrer'>
          Retno Aulia Vinarti, S.Kom., M.Kom., Ph.D.{" "}
          <Icon mx="0.5" asChild><LuExternalLink /></Icon>
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Thesis Supervisor 2{" "}
        <Link
          href="https://scholar.google.com/citations?user=WuDASG4AAAAJ&hl=en"
          target='_blank'
          rel='noopener noreferrer'>
          Faizal Mahananto, S.Kom., M.Eng., Ph.D. <Icon mx="0.5" asChild><LuExternalLink /></Icon>
        </Link>
      </Text>
      <Text textAlign={"center"}>
        App and Design by{" "}
        <Link
          href="https://www.showwcase.com/mrasyadc"
          target='_blank'
          rel='noopener noreferrer'>
          Muhammad Rasyad Caesarardhi <Icon mx="0.5" asChild><LuExternalLink /></Icon>
        </Link>
        and{" "}
        <Link
          href="https://www.github.com/dianizzah"
          target='_blank'
          rel='noopener noreferrer'>
          Dian Nizzah Fortuna <Icon mx="0.5" asChild><LuExternalLink /></Icon>
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Disease similarity score computed using{" "}
        <Link
          href="https://doi.org/10.1093/bioinformatics/btx238"
          target='_blank'
          rel='noopener noreferrer'>
        BIOSSES: a Semantic Sentence Similarity Estimation System for the Biomedical Domain{" "}
          <Icon mx="0.5" asChild><LuExternalLink /></Icon>
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Original data provided by{" "}
        <Link
          href="https://onlinelibrary.wiley.com/doi/book/10.1002/9781444354690"
          target='_blank'
          rel='noopener noreferrer'>
          Atlas of Human Infectious Diseases <Icon mx="0.5" asChild><LuExternalLink /></Icon>
        </Link>
      </Text>
    </>
  );
}
