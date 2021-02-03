import { RadioGroup, VStack, Radio, Text } from "@chakra-ui/react";

const CustomRadioGroup = (props) => {
  return (
    <>
      <Text>{props.label}</Text>
      <RadioGroup onChange={props.callback} value={props.value}>
        <VStack alignItems="left">
          {props.choices.map((choice) => {
            return (
              <Radio
                key={choice.label}
                _active={{ outline: "green" }}
                size="lg"
                colorScheme="red"
                value={choice.value}
              >
                {choice.label}
              </Radio>
            );
          })}
        </VStack>
      </RadioGroup>
    </>
  );
};

export default CustomRadioGroup;
