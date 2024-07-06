import {
  convertToMorse,
  transToEng,
  invalidCharacter,
  emptyinput,
} from "./script-morse.js";

describe("Test cases for translating text into morse-code", () => {
  test("given string input return that string translated to morse-code with 1 space seperating characters and 3 spaces seperating words. Spaces, numbers and punctuation is allowed to pass through and remain unchanged", () => {
    expect(convertToMorse("Hello")).toBe(".... . .-.. .-.. ---");
    expect(convertToMorse("What is the time")).toBe(
      ".-- .... .- -  .. ...  - .... .  - .. -- ."
    );
    expect(convertToMorse(" ")).toBe(" ");
    expect(convertToMorse("space between")).toBe(
      "... .--. .- -.-. .  -... . - .-- . . -."
    );
    expect(convertToMorse("a b")).toBe(".-  -...");
    expect(convertToMorse("1 2 3")).toBe(".----  ..---  ...--");
    expect(convertToMorse("123")).toBe(".---- ..--- ...--");
  });

  test("if input is left empty", () => {
    expect(() => {
      convertToMorse(undefined);
    }).toThrow(emptyinput);
    expect(() => {
      convertToMorse("");
    }).toThrow(emptyinput);
  });

  test("if an invalid character is typed", () => {
    expect(() => {
      convertToMorse(".---- ");
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse("1!");
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse(123);
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse(false);
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse("What is the time?");
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse(".");
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse("?");
    }).toThrow(invalidCharacter);
    expect(() => {
      convertToMorse("-");
    }).toThrow(invalidCharacter);
  });
});
