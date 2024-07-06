import {
  convertToMorse,
  transToEng,
  invalidCharacter,
  emptyinput,
  invalidMorse,
} from "./script-morse.js";

const spaceError = new Error("spaces handled incorrectly");

describe("Test cases for translating text into morse code", () => {
  test("given string input return that string translated to morse code with 1 space seperating characters and 3 spaces seperating words. Spaces are allowed to pass through and remain unchanged", () => {
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

describe("Test cases for translating morse code into text", () => {
  test("when given a string of morse code return a string of letters and numbers", () => {
    expect(transToEng(".... . .-.. .-.. ---")).toBe("HELLO");
    expect(
      transToEng("- .... .  .-- . .- - .... . .-.  .. ...  ... ..- -. -. -.--")
    ).toBe("THE WEATHER IS SUNNY");
    expect(transToEng(".-")).toBe("A");
    expect(transToEng("----.")).toBe("9");
    expect(transToEng(".---- --... ..---  -... . . ...")).toBe("172 BEES");
    expect(
      transToEng(
        "....-  ---..  .---- .....  .---- -....  ..--- ...--  ....- ..---"
      )
    ).toBe("4 8 15 16 23 42");
  });

  test("if input is left empty", () => {
    expect(() => {
      transToEng(undefined);
    }).toThrow(emptyinput);
    expect(() => {
      transToEng("");
    }).toThrow(emptyinput);
  });

  test("if an invalid character is typed", () => {
    expect(() => {
      transToEng("Hello");
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng("1!");
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng(123);
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng(false);
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng(true);
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng("What is the time?");
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng("2");
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng("?");
    }).toThrow(invalidCharacter);
    expect(() => {
      transToEng("G");
    }).toThrow(invalidCharacter);
  });

  test("if invalid morse code is typed", () => {
    expect(() => {
      transToEng("......");
    }).toThrow(invalidMorse);
    expect(() => {
      transToEng("------");
    }).toThrow(invalidMorse);
    expect(() => {
      transToEng("-.-.-.");
    }).toThrow(invalidMorse);
    expect(() => {
      transToEng(".... . .-.. .-..---");
    }).toThrow(invalidMorse);
  })

});
