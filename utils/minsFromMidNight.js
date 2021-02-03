export default function (time) {
  var timeArray = time.split(":");
  return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
}
