import fs from "fs";
import User from "../../data/createUserObject.mjs";
import detailsArrayGenerator from "./randomUserDetails.mjs";

let dummyData = {};

for (let i = 1; i < 10000; i++) {
  dummyData["User ".concat(i.toString())] = new User(detailsArrayGenerator());
}

fs.writeFile("dummyData.json", JSON.stringify(dummyData), function (err) {
  if (err) throw err;
  console.log("Saved!");
});

//This thing is suuper wonky. Make sure to cd into the test/dummydata directory before running this 
//file through the terminal node command. 
