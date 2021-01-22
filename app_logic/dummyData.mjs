import { dataGenerator as d } from "./mathematicalFunctions.mjs"

function User(...properties) {
  [
    this.pickupLocation, // An array of coordinates
    this.dropoffLocation, // An array of coordinates
    this.pickupTime, // A number, representing time in MINUTES FROM 0000 MIDNIGHT. For example, 6.30am would be 390.\

    this.isMale, // Boolean

    this.pickupLocationRadius = 1, //A number representing distance in km
    this.dropoffLocationRadius = 1, //A number representing distance in km
    this.pickupTimeBuffer = 15, //A number representing minutes

    this.returnPickup = null, // The remaining are self evident
    this.returnDropOff = null,
    this.returnPickupTime = null,

    this.returnPickupRadius = this.returnPickup ? 1 : null,
    this.returnDropOffRadius = this.returnDropOff ? 1 : null,
    this.returnPickupTimeBuffer = this.returnPickupTime ? 15 : null,
  ] = properties;
}

const User1 = new User(
  d.randomCoordinates(),
  d.randomCoordinates(),
  d.randomPickupTime(),

  d.eitherOr(()=>true,()=>false),

  d.eitherOr(d.randomRadius, ()=>null),
  d.eitherOr(d.randomRadius, ()=>null),
  d.eitherOr(d.randomTimeBuffer, ()=>null),

  d.eitherOr(d.randomCoordinates, ()=>null),
  d.eitherOr(d.randomCoordinates, ()=>null),
  d.eitherOr(d.randomReturnPickupTime, ()=>null),

  d.eitherOr(d.randomRadius, ()=>null),
  d.eitherOr(d.randomRadius, ()=>null),
  d.eitherOr(d.randomTimeBuffer, ()=>null)
);

console.log(User1)
