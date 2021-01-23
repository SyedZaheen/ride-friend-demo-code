import notDefined from "./notDefined.mjs";
//First we use a User object constructor. Takes one details array as an argument
//The details argument is basically an array with the 3E9O in order,but you can
//read the details generator below in order to see what each property represents more precisely
function User(details) {
  let remaining;
  [
    this.pickupLocation, // An array of coordinates
    this.dropoffLocation, // An array of coordinates
    this.pickupTime, // A number, representing time in MINUTES FROM 0000 MIDNIGHT. For example, 6.30am would be 390.\

    this.isMale, // Boolean

    this.pickupLocationRadius = 1, //A number representing distance in km
    this.dropoffLocationRadius = 1, //A number representing distance in km
    this.pickupTimeBuffer = 15, //A number representing minutes
    ...remaining //I take the remaining arguments
  ] = details;

  for (let i = 0; i < 3; i++) {
    if (remaining[i]) {
    } else {
      remaining[i + 3] = null;
    }
    //This means, IF RETURN PICKUP LOCATION(i=0) IS UNDEFINED, SET RETURN PICKUP RADIUS AUTOMATICALLY TO NULL.
    //I use the for loop in order to do the same for return dropoff location(i=1) and return pickup time(i=2)
    //Can be made more concise with a ternary operator, but I want it to be readable
  }

  [
    this.returnPickup = null, // An array of coordinates
    this.returnDropOff = null, // An array of coordinates
    this.returnPickupTime = null, //A number representing time in minutes

    this.returnPickupRadius = null, // A distance in km
    this.returnDropOffRadius = null, //A distance in km
    this.returnPickupTimeBuffer = null, //Time in minutes
  ] = remaining;
}

function passOnUserObject(){
    notDefined(passOnUserObject);
}
//The below code is a random user details generator, which then creates dummy users, and passes it on to 
// dummyData.json. Delete the below code after testing.
import { dataGenerator as d } from "./mathematicalFunctions.mjs";

//Random user details generator. Returns an array to be passed as an argument to User()
const detailsArrayGenerator = () => [
  d.randomCoordinates(), //Pickup location
  d.randomCoordinates(), //DropOff location
  d.randomPickupTime(), //Pickup time

  d.eitherOr(
    () => true,
    () => false
  ), //Is male or female

  d.eitherOr(d.randomRadius, () => undefined), //Pickup location radius
  d.eitherOr(d.randomRadius, () => undefined), //DropOff location radius
  d.eitherOr(d.randomTimeBuffer, () => undefined), //Pickup time buffer

  d.eitherOr(d.randomCoordinates, () => undefined), //Return Pickup location
  d.eitherOr(d.randomCoordinates, () => undefined), //Return DropOff location
  d.eitherOr(d.randomReturnPickupTime, () => undefined), //Return Pickup time

  d.eitherOr(d.randomRadius, () => undefined), //Return Pickup Location radius
  d.eitherOr(d.randomRadius, () => undefined), //Return dropoff location radius
  d.eitherOr(d.randomTimeBuffer, () => undefined), // Return pickup time buffer
];

//Then we pass it into the constructor to get a new User object
// const UserObject = new User(detailsArrayGenerator);
// console.log(UserObject)

let Data = {};

for (let i = 1; i < 101; i++) {
  Data["User ".concat(i.toString())] = new User(detailsArrayGenerator());
}

import fs from "fs";

fs.writeFile("dummyData.json", JSON.stringify(Data), function (err) {
  if (err) throw err;
  console.log("Saved!");
});