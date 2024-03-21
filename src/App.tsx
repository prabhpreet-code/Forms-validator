import React, { useState } from "react";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import "./App.css";

import RegistrationForm from "./components/RegistrationForm";
import Result from "./components/Result";
import { useForm, FormProvider } from "react-hook-form";

const App: React.FC = () => {
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = () => {
    //For handling loading states
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 3000);
  };
  return (
    <FormProvider {...methods}>
      <Box className="App" my={10}>
        {!isLoading ? (
          isSubmitted ? (
            <Result />
          ) : (
            <RegistrationForm onSubmit={onSubmit} />
          )
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal"
              size="xl"
            />
          </Flex>
        )}
      </Box>
    </FormProvider>
  );
};

export default App;
