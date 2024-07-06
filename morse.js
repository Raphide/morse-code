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

const invalidCharacter = new Error("Please only use letters, numbers and spaces within a string");
const emptyinput = new Error("Please input text");

const regex = /[^.-\s]/; //regex for morse code textbox
const regexInverse = /[^A-Z0-9\s]/i; //regex for english textbox

const convertToMorse = (engString) => {
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

// console.log(convertToMorse("Hi, my name is Atlas 1 2 3"));
// console.log(convertToMorse("what is up with this?"));

//all together
const transToEng = (input) => {
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

// console.log(
//   joinWord(
//     morseWord(
//       convertToEnglish(
//         ".-- .... .- -   - .... .   .... . .-.. .-..   .. ...   ..- .--.   .-- .. - ....   - .... .. ... ?"
//       )
//     )
//   )
// );

// console.log(
//   convertToEnglish(
//     ".-- .... .- -   - .... .   .... . .-.. .-..   .. ...   ..- .--.   .-- .. - ....   - .... .. ... ?"
//   )
// );
// console.log(
//   morseWord("W H A T   T H E   H E L L   I S   U P   W I T H   T H I S ")
// );

// console.log(
//   joinWord([
//     "W H A T",
//     " T H E",
//     " H E L L",
//     " I S",
//     " U P",
//     " W I T H",
//     " T H I S ",
//   ])
// );
// console.log(
//   transToEng(
//     ".-- .... .- -   - .... .   .... . .-.. .-..   .. ...   ..- .--.   .-- .. - ....   - .... .. ... ?"
//   )
// );

const appendElementWithText = (elementType, text, parent) => {
  const newElement = document.createElement(elementType);
  const textNode = document.createTextNode(text);
  newElement.appendChild(textNode);
  parent.appendChild(newElement);
};

const morseText = document.getElementById("morseCode");
const engText = document.getElementById("english");
const engToMorse = document.getElementById("english-to-morse");
const morseToEng = document.getElementById("morse-to-english");
const button = document.getElementById("btn");
const morseResult = document.querySelector("#morse");
const engResult = document.querySelector("#eng");
const clearMorse = document.getElementById("clearMorse");
const clearEng = document.getElementById("clearEng");

engToMorse.addEventListener("submit", (e) => {
  e.preventDefault();
  const transMorse = convertToMorse(engText.value);
  console.log(engText.value);
  console.log(transMorse);
  appendElementWithText("h3", transMorse, morseResult);
});

morseToEng.addEventListener("submit", (e) => {
  e.preventDefault();
  const transEng = transToEng(morseText.value);
  console.log(transEng);
  if (transEng === "") {
    appendElementWithText("h4", "Please enter valid morse-code", engResult);
  } else {
    appendElementWithText("h3", transEng, engResult);
  }
});

engText.addEventListener("keyup", (e) => {
  e.target.value = e.target.value.replace(regexInverse, "");
}); //used to prevent "." or "-" from being typed in

morseText.addEventListener("keyup", (e) => {
  e.target.value = e.target.value.replace(regex, ""); //used to prevent characters other than ".", "-" or " " from being typed in
});

//need to add error state for submitting invalid morse code. right now it returns nothing

//need to add buttons to clear outputs
// clearEng.addEventListener("click", () => {
//   engResult.removeChild(engResult);
// });


// /[\.-]/g; //alternative textbox

// 