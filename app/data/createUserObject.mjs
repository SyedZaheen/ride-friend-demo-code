import notDefined from "../notDefined.mjs";
//First we use a User object constructor. Takes one details array as an argument
//The details argument is basically an array with the 3E9O in order,but you can
//read ../test/createRandomUser.mjs in order to see what each property represents more precisely
export default class User {
  constructor(details) {
    let remaining;
    [
      this.pickupLocation,
      this.dropoffLocation,
      this.pickupTime,

      this.isMale,

      this.pickupLocationRadius = 1,
      this.dropoffLocationRadius = 1,
      this.pickupTimeBuffer = 15,
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
      this.returnPickup = null,
      this.returnDropOff = null,
      this.returnPickupTime = null,

      this.returnPickupRadius = null,
      this.returnDropOffRadius = null,
      this.returnPickupTimeBuffer = null,
    ] = remaining;
  }
}

function passOnUserObject(){
    notDefined(passOnUserObject);
}
