import fs from "fs";

export default function randomDummyUser(pathToDummyData) {
  return JSON.parse(fs.readFileSync(pathToDummyData))[ //This is retarded
    "User " + Math.floor(Math.random() * 10000)
  ];
}

//testing:
// console.log(randomDummyUser("dummyData.json"))
