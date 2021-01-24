export default function boolean(value) {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else {
    return `${value} is an invalid input to the boolean function. Valid Inputs: "true", "false"`;
  }
}
