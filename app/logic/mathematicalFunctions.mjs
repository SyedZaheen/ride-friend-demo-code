export function calculateDistance(arrayOfCoordinates1, arrayOfCoordinates2) {
  // Takes in two arrays of coordinates, and returns the distance between them in kilometers
  // At the moment , this function is still a little bit inaccurate(0.3%). We probably need to use Google's
  // distance matrix API (https://developers.google.com/maps/documentation/distance-matrix/overview#distance-matrix-responses)
  // in the future but let's use this for now
  const [lat1, lon1] = arrayOfCoordinates1;
  const [lat2, lon2] = arrayOfCoordinates2;
  const R = 6.3781e6; // radius of the earth in metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = (R * c) / 1000;

  return distance; // in kilometers, 0.3% error
}

export const dataGenerator = {
  randomCoordinates: () => {
    // This function approximates singapore to be approximately a rhombus, and generates
    // a random coordinate from within that rhombus
    const SGCentralLatitude = 1.3521;
    const SGCentralLongitude = 103.8198;
    const newLatitude = SGCentralLatitude - 0.11 + Math.random() * 0.22;
    const newLongitude = SGCentralLongitude - 0.2 + Math.random() * 0.4;
    return [newLatitude, newLongitude];
  },

  randomPickupTime: () => 360 + Math.floor(Math.random() * 13) * 10,
  // This function generates a random time between 6am and 8am, in minutes from midnight

  randomReturnPickupTime: () => 1020 + Math.floor(Math.random() * 13) * 10,
  // This function generates a random time between 5pm and 7pm, in minutes from midnight

  eitherOr: function (either, or) {
    // This function executes either of the argument functions at a 50% probability
    if (Math.random() * 2 < 1) {
      return either();
    } else {
      return or();
    }
  },

  randomRadius: () => 0.5 + Math.floor(Math.random() * 11) * 0.1,
  // This function generates a random radius between 0.5km and 1.5km

  randomTimeBuffer: () => 15 + Math.floor(Math.random() * 31),
  // This function generates a random time buffer between 15 and 45 minutes
};

export function calculateUnitScore(
  maxScore,
  deviation,
  distance,
  percentageAtDeviation1,
  percentageAtDeviation2
) {
  let p, q, r, x, a, b, c, l, m, ekr, emk, result;
  p = percentageAtDeviation1;
  q = percentageAtDeviation2;
  r = deviation;
  x = distance;

  a = (p / q - 1) * (p - 1);

  b = (2 * p ** 2 - (p * q + p)) / q;

  c = p ** 2 / q - 1;

  l = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);

  ekr = (p - 1) * l + p;

  m = maxScore * (l + ekr);

  emk = ekr ** (-1 / r);

  result = m / (l + emk ** x * ekr);

  return result;
}

const percentageAtDeviationGlobal1 = 0.7;
const percentageAtDeviationGlobal2 = 0.4;

export function calculateTotalScore(distance, deviation1, deviation2) {
  return (
    calculateUnitScore(
      333 / 2,
      deviation1,
      Math.abs(distance) / 2,
      0.6,
      0.1
    ) +
    calculateUnitScore(
      333 / 2,
      deviation2,
      Math.abs(distance) / 2,
      0.6,
      0.1
    )
  );
}

export function nullHandler(value, defaultValue) {
  if (value === null) {
    return defaultValue;
  } else {
    return value;
  }
}

