import fs from "fs";

export default function allDummyUsers(pathToDummyData) {
  return JSON.parse(fs.readFileSync(pathToDummyData)); //This is retarded
}

//testing: 
// console.log(allDummyUsers("dummyData.json"))