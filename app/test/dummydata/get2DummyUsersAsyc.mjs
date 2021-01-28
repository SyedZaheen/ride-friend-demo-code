import fs from "fs";

export function getAUser() {
  return new Promise((resolve, reject) => {
    fs.readFile("./dummyData.json", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data)["User " + Math.floor(Math.random() * 10000)]);
    });
  });
}

export default async function getTwoUsersAsync() {
  try {
    let x = [await getAUser(), await getAUser()];
    return x;
  } catch (error) {
    console.log(error);
  }
}


