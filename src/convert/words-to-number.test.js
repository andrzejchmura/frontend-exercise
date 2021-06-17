import { convertWordsToNumber } from "./words-to-number";

describe("words-to-number", () => {
  it.each`
    output         | input
    ${"0"}         | ${"zero"}
    ${"1"}         | ${"one"}
    ${"2"}         | ${"two"}
    ${"12"}        | ${"twelve"}
    ${"54"}        | ${"fifty four"}
    ${"120"}       | ${"one hundred and twenty"}
    ${"9234"}      | ${"nine thousand two hundred and thirty four"}
    ${"1000"}      | ${"one thousand"}
    ${"100000"}    | ${"one hundred thousand"}
    ${"1000000"}   | ${"one million"}
    ${"123456789"} | ${"one hundred and twenty three million four hundred and fifty six thousand seven hundred and eighty nine"}
    ${"999999999"} | ${"nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine"}
  `("should convert number to words correctly", ({ input, output }) => {
    expect(convertWordsToNumber(input)).toBe(output);
  });

  it("should return an error message when the text is not valid", () => {
    expect(convertWordsToNumber("this is not a valid string")).toBe(
      "Sorry, could not parse the text correctly"
    );
  });
});
