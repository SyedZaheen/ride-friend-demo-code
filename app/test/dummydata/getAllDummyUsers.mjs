import fs from "fs";

export default function randomDummyUser(pathToDummyData) {
  return JSON.parse(fs.readFileSync(pathToDummyData));
}
