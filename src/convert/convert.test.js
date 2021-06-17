import { convert } from "./convert";

describe("convert", () => {
  it("should handle invalid input gracefully", () => {
    const invalidError =
      "Please provide a number using either digits or words.";
    const outOfRangeError = "This number is out of range";

    expect(convert("")).toBe("");
    expect(convert("one 2 three")).toBe(invalidError);
    expect(convert("123456789000")).toBe(outOfRangeError);
  });
});
