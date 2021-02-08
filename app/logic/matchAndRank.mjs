// This file will need 2 things:
// 1. A user
// 2. A list of other users to rank this user with
// Lets only handle this with imports.

import notDefined from "../notDefined.mjs";
import randomDummyUser from "../test/dummydata/getRandomDummyUser.mjs";
import {
  calculateDistance as cd,
  calculateTotalScore,
  nullHandler,
} from "./mathematicalFunctions.mjs";
import allDummyUsers from "../test/dummydata/getAllDummyUsers.mjs";

const testUser = randomDummyUser("../test/dummydata/dummyData.json");
const targetUser = testUser;
// console.log(testUser);
let {
  pickupLocation: PuL1,
  dropoffLocation: DoL1,
  pickupTime: PuT1,
  isMale: iM1,
  pickupLocationRadius: PuLR1,
  dropoffLocationRadius: DoLR1,
  pickupTimeBuffer: PuTB1,
  returnPickup: RP1,
  returnDropOff: RDo1,
  returnPickupTime: RPuT1,
  returnPickupRadius: RPuR1,
  returnDropOffRadius: RDoR1,
  returnPickupTimeBuffer: RPuTB1,
} = targetUser;

const allTestUsers = allDummyUsers("../test/dummydata/dummyData.json");
const allOtherUsers = allTestUsers;

function allScores() {
  return new Promise((resolve, reject) => {
    try {
      let listOfScores = [];
      // console.log(typeof listOfScores);
      for (let eachUser in allOtherUsers) {
        // console.log(allOtherUsers[eachUser])
        const {
          pickupLocation: PuL2,
          dropoffLocation: DoL2,
          pickupTime: PuT2,
          isMale: iM2,
          pickupLocationRadius: PuLR2,
          dropoffLocationRadius: DoLR2,
          pickupTimeBuffer: PuTB2,
          returnPickup: RP2,
          returnDropOff: RDo2,
          returnPickupTime: RPuT2,
          returnPickupRadius: RPuR2,
          returnDropOffRadius: RDoR2,
          returnPickupTimeBuffer: RPuTB2,
        } = allOtherUsers[eachUser];

        let pickupLocationComponent = calculateTotalScore(
          cd(PuL1, PuL2),
          nullHandler(PuLR1, 1),
          nullHandler(PuLR2, 1)
        );
        let dropOffLocationComponent = calculateTotalScore(
          cd(DoL1, DoL2),
          nullHandler(DoLR1, 1),
          nullHandler(DoLR2, 1)
        );
        let pickupTimeComponent = calculateTotalScore(
          PuT1 - PuT2,
          nullHandler(PuTB1, 15),
          nullHandler(PuTB2, 15)
        );
        // console.log(pickupLocationComponent,dropOffLocationComponent,pickupTimeComponent)
        let level2 =
          pickupLocationComponent +
          dropOffLocationComponent +
          pickupTimeComponent;
        // console.log(level2);
        listOfScores.push(level2);
        // console.log(listOfScores)
        // resolve(listOfScores);
        // break;
        if (listOfScores.length >= 9999) {
          listOfScores.sort((a, b) => b - a);
          resolve(listOfScores);
          break;
        } else {
          continue;
        }
      }
    } catch (err) {
      reject(err);
    }
  });
}
async function getTop10() {
  let scores = await allScores();
  console.log(scores.slice(0 , 10));
}

getTop10();


function passOnResuts(results) {
  notDefined(passOnResuts);
}
