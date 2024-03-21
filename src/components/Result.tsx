import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Stat,
  StatLabel,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export default function Result() {
  // For getting values from react-hook context
  const { getValues } = useFormContext();
  console.log(getValues("lastname"));
  console.log(getValues("techStacks"));

  const Firstname = getValues("firstname");
  const Lastname = getValues("lastname");
  const Email = getValues("email");
  const Phone = getValues("phone");
  const Gender = getValues("gender");
  const CurrentDate = getValues("date");
  const TechStack = getValues("techStacks");

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box>
        <Stat mt={5}>
          <Heading my={2} as="h4" fontSize="20px">
            Submitted Result
          </Heading>
          <Stack
            p={4}
            width="50vh"
            height="auto"
            borderWidth="3px"
            borderRadius="md"
            direction="column"
            align="flex-start"
          >
            <HStack>
              <StatLabel fontSize="lg">Name: {Firstname}</StatLabel>
              <StatLabel fontSize="lg">{Lastname}</StatLabel>
            </HStack>
            <StatLabel fontSize="lg">Email: {Email}</StatLabel>
            <StatLabel fontSize="lg">Phone: {Phone}</StatLabel>
            <StatLabel fontSize="lg">Gender: {Gender.label}</StatLabel>
            <StatLabel fontSize="lg">Date: {CurrentDate}</StatLabel>
            <HStack>
              <StatLabel fontSize="lg">Tech Stack:</StatLabel>
              {TechStack?.map((tech: { label: string; value: string }) => (
                <StatLabel fontSize="lg">{tech.value}</StatLabel>
              ))}
            </HStack>
          </Stack>
        </Stat>
      </Box>
    </Flex>
  );
}
