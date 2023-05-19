"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Heading
        fontSize={"48px"}
        fontWeight={700}
        as="h1"
        marginTop={20}
        textAlign={"center"}
      >
        Atlas of Human Infectious Disease
      </Heading>
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Dictionary
      </Heading>
      <Text textAlign={"center"}>
        App and Design by Muhammad Rasyad Caesarardhi
      </Text>
      <Text textAlign={"center"}>
        Data processed and summarized using algorithm from BRIO paper
      </Text>
      <Text textAlign={"center"}>
        Data provided by Atlas of Human Infectious Diseases
      </Text>
    </>
  );
}
