// This file will need 2 things:
// 1. A user
// 2. A list of other users to rank this user with 
// Lets only handle this with imports.

import notDefined from "../notDefined.mjs"
import randomDummyUser from "../test/dummydata/getRandomDummyUser.mjs";
import allDummyUsers from "../test/dummydata/getAllDummyUsers.mjs" //Not made yet

const testUser = randomDummyUser('../test/dummydata/dummyData.json')

const allOtherUsers = allDummyUsers("../test/dummydata/dummyData.json")

// compare(testuser,allusers) => rankedlistOf10users