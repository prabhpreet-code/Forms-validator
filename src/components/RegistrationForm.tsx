import {
  VStack,
  Input,
  Box,
  Button,
  Text,
  HStack,
  FormLabel,
  Stack,
  IconButton,
  Flex,
  FormControl,
  Heading,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import AlertPopUp from "./common/AlertPopUp";
import { Select, chakraComponents } from "chakra-react-select";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

interface RegistrationFormProps {
  onSubmit: () => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  // For styling background in chakra-react-select
  const chakraStyles = {
    option: (provided: any) => ({
      ...provided,
      color: "black",
      backgroundColor: "white",
    }),
  };

  // For implementing green tick functionality in chakra-react-select
  const submitButtonRef: any = useRef();
  const CustomOption: any = forwardRef(({ children, ...props }: any, ref) => {
    const isSelected = !!props.isSelected;
    return (
      <chakraComponents.Option {...props}>
        <Flex ref={ref} align="center" justifyContent="space-evenly" {...props}>
          <Text mr={3}>{children}</Text>
          {isSelected && <CheckIcon color="green.500" />}
        </Flex>
      </chakraComponents.Option>
    );
  });
  useImperativeHandle(submitButtonRef, () => ({
    click() {
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    },
  }));

  // for managing react-hook forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStacks",
  });

  return (
    <VStack mt={8} spacing="3px">
      <Heading as="h1" mb={5}>
        User Details
      </Heading>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Firstname */}
          <VStack>
            <HStack>
              <VStack height="auto" mb={5} spacing={0} align="stretch">
                <FormLabel fontWeight="bold" fontSize="lg" htmlFor="name">
                  First name
                </FormLabel>
                <Input
                  type="text"
                  placeholder=" Enter First name"
                  {...register("firstname", {
                    required: "Please enter first name",
                    minLength: { value: 3, message: "Too short" },
                    maxLength: 80,
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Invalid name format",
                    },
                  })}
                />
                {errors.firstname && (
                  <AlertPopUp title={errors.firstname.message} />
                )}
              </VStack>

              {/* Lastname */}
              <VStack mb={5} spacing={0} align="stretch">
                <FormLabel fontWeight="bold" fontSize="lg" htmlFor="name">
                  Last name
                </FormLabel>
                <Input
                  type="text"
                  placeholder=" Enter Last name"
                  {...register("lastname", {
                    required: "Please enter Last name",
                    minLength: { value: 3, message: "Too short" },
                    maxLength: 100,
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Invalid name format",
                    },
                  })}
                />
                {errors.lastname && (
                  <AlertPopUp title={errors.lastname.message} />
                )}
              </VStack>
            </HStack>
            <HStack>
              {/* Email */}
              <VStack spacing={0} align="stretch">
                <FormLabel fontWeight="bold" fontSize="lg" htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  placeholder=" Enter Email"
                  {...register("email", {
                    required: "Please enter email",

                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <AlertPopUp title={errors.email.message} />}
              </VStack>
              {/* Phone Number */}
              <VStack spacing={0} align="stretch">
                <FormLabel fontWeight="bold" fontSize="lg" htmlFor="phone">
                  Phone Number
                </FormLabel>
                <Input
                  type="text"
                  placeholder="+91 XXXXXXXXXX"
                  {...register("phone", {
                    required: "Please enter phone",
                    pattern: {
                      value: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                />
                {errors.phone && <AlertPopUp title={errors.phone.message} />}
              </VStack>
              {/* Gender */}
            </HStack>
            <Controller
              control={control}
              name="gender"
              rules={{ required: "Please enter the gender" }}
              render={({ field: { onChange, value } }) => (
                <VStack width="300px">
                  <FormControl py={4} id="gender">
                    <FormLabel fontWeight="bold" fontSize="lg">
                      Gender
                    </FormLabel>
                    <Box w="300px">
                      <Select
                        className={"react-select"}
                        classNamePrefix={"react-select"}
                        chakraStyles={chakraStyles}
                        value={value}
                        options={genderOptions}
                        placeholder="Choose Gender"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        components={{ Option: CustomOption }}
                        onChange={onChange}
                        closeMenuOnSelect={false}
                      />
                    </Box>
                    {errors.gender && (
                      <AlertPopUp title={errors.gender.message} />
                    )}
                  </FormControl>
                </VStack>
              )}
            />
            {/* Tech Stack */}
            <Box
              width="300px"
              maxWidth="500px"
              p={4}
              borderWidth={1}
              borderRadius="lg"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <FormLabel fontWeight="bold" fontSize="lg">
                  Tech Stack
                </FormLabel>
                <Button onClick={() => append({ value: "" })}>
                  <AddIcon />
                </Button>
              </Flex>

              <Stack spacing={3}>
                {fields.map((item: any, index: any) => (
                  <Box key={item.id} display="flex" alignItems="center">
                    <Controller
                      name={`techStacks[${index}].value`}
                      control={control}
                      defaultValue={item.value}
                      rules={{
                        required: `Please enter the Tech Stack ${`techStacks[${index}].value`}`,
                      }}
                      render={({ field }) => (
                        <Input
                          marginRight="10px"
                          placeholder="Enter tech stack"
                          {...field}
                        />
                      )}
                    />
                    <IconButton
                      aria-label="Remove tech stack"
                      icon={<CloseIcon />}
                      onClick={() => remove(index)}
                    />
                  </Box>
                ))}
                {errors.techStacks && (
                  <AlertPopUp title={"Please enter value"} />
                )}
              </Stack>
            </Box>

            {/* Date */}
            <VStack spacing={0} align="stretch">
              <FormLabel fontWeight="bold" fontSize="lg" htmlFor="name">
                Select Date
              </FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                {...register("date", {
                  required: "Please select date",
                })}
              />
              {errors.date && <AlertPopUp title={errors.date.message} />}
            </VStack>

            {/* Button */}
            <Button
              borderRadius="md"
              bg="cyan.600"
              _hover={{ bg: "cyan.200" }}
              variant="ghost"
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
}
