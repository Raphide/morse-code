const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
};

export const invalidCharacter = new Error(
  "Please only use letters, numbers and spaces within a string"
);
export const emptyinput = new Error("Please input text");

const regex = /[^.-\s]/; //regex for morse code textbox
const regexInverse = /[^A-Z0-9\s]/i; //regex for english textbox

export const convertToMorse = (engString) => {
  if (engString === undefined || engString === "") {
    throw emptyinput;
  }

  if (typeof engString !== "string" || regexInverse.test(engString)) {
    throw invalidCharacter;
  }

  return engString
    .toUpperCase() //converts all string to uppercase as this only accounts for uppercase keys
    .split("") //splits every character and puts them into an array
    .map((char) => {
      // .map the array of characters
      return morseCode[char] ? morseCode[char] : char; // if the character matches a key in the above Object, return the item in the object, else return the character how it is (currently only characters in object are A-Z)
    })
    .join(" ")
    .replaceAll("   ", "  "); //join them all together with spaces inbetween each morse character
  // extra spaces necessary for translating back into english
};

export const transToEng = (input) => {
  // this converts the morse code to letters
  const convertToEnglish = (morse) => {
    return morse
      .split(" ")
      .map((value) => {
        return Object.keys(morseCode).find((key) => morseCode[key] === value); //using .find() instead of .filter() so it only returns the key with the exact value instead of multiple keys that may have similar values
      })
      .join(" ");
  };

  //this converts the letters into an array of words
  const morseWord = (word) => {
    return word.split("  ");
  };

  // this joins the array and removes the excess spaces
  const joinWord = (wordArr) => {
    return wordArr
      .map((wordItem) => {
        return wordItem.replaceAll(" ", "");
      })
      .join(" ");
  };

  return joinWord(morseWord(convertToEnglish(input)));
};
