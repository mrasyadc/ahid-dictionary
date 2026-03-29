import { Steps, Heading, Link, Text, Icon } from "@chakra-ui/react";
import { LuExternalLink } from 'react-icons/lu';

export default function Header() {
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
          href="https://scholar.google.com/citations?user=TlI3mc0AAAAJ&hl=en"
          target='_blank'
          rel='noopener noreferrer'>
          Renny Pradina, S.T., M.T. <Icon mx="0.5" asChild><LuExternalLink /></Icon>
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
      </Text>
      <Text textAlign={"center"}>
        Data processed and summarized using{" "}
        <Link
          href="https://aclanthology.org/2022.acl-long.207/"
          target='_blank'
          rel='noopener noreferrer'>
          Bringing Order to Abstractive Summarization paper{" "}
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
