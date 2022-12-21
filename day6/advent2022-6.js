const fs = require("fs");
const input = fs.readFileSync("input6.txt", "utf8");

const LENGTH_MARKER = 4;
const LENGTH_MESSAGE = 14;

const getMarker = (lengthPacket) => {
  let packet = []; // sequence of consecutive different chars

  for (let i = 0; i < input.length; i++) {
    if (packet.length === lengthPacket) {
      return i; // return index of start-of-packet/message
    }
    if (packet.includes(input[i])) {
      packet = []; // clear sequence and start from here
    }
    packet.push(input[i]);
  }
  return "No sequence found";
};

/*=============================================
=                  Part 1                     =
=============================================*/

console.log(getMarker(LENGTH_MARKER));

/*=============================================
=               Part 2 TODO                   =
=============================================*/

console.log(getMarker(LENGTH_MESSAGE)); // Max consecutive different chars is 12? :(
