import {
  calculateTotalScore,
  calculateDistance,
} from "../logic/mathematicalFunctions.mjs";
import randomDummyUser from "./dummydata/getRandomDummyUser.mjs";

const user1 = randomDummyUser("./dummydata/dummyData.json"); //This is retarded
const user2 = randomDummyUser("./dummydata/dummyData.json"); //This is retarded

let x = calculateTotalScore(
  calculateDistance(user1.pickupLocation, user2.pickupLocation),
  3,
  user1.pickupLocationRadius,
  user2.pickupLocationRadius
);

console.log(x);
