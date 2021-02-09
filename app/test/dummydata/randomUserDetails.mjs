//The below code is a random user details generator, which then creates dummy users, and passes it on to 
// dummyData.json. 
import { dataGenerator as d } from "../../logic/mathematicalFunctions.mjs";

//Random user details generator. Returns an array to be passed as an argument to User()
export default function detailsArrayGenerator() { return [
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
]};

//Then we pass it into the constructor to get a new User object
import User from "../data/createUser.mjs"
const UserObject = new User(detailsArrayGenerator);
console.log(UserObject)

  

