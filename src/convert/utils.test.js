import { invert, tokenize, isNumeric, isVerbal } from "./utils";

describe("utils", () => {
  describe("isNumeric", () => {
    it("should match only numeric input", () => {
      expect(isNumeric("text")).toBe(false);
      expect(isNumeric("123 mixed")).toBe(false);
      expect(isNumeric("123")).toBe(true);
    });
  });

  describe("isVerbal", () => {
    it("should match only verbal input", () => {
      expect(isVerbal("123")).toBe(false);
      expect(isVerbal("123 mixed")).toBe(false);
      expect(isVerbal("text")).toBe(true);
    });
  });

  describe("tokenize", () => {
    it("should partition the string into 3-digits-max groups of numbers", () => {
      expect(tokenize("")).toEqual([""]);
      expect(tokenize("123")).toEqual(["123"]);
      expect(tokenize("123456789")).toEqual(["123", "456", "789"]);
    });
  });

  describe("invert", () => {
    it("given number-to-word dictionary should return word-to-number dictionary", () => {
      expect(
        invert({
          0: "zero",
          1: "one",
        })
      ).toEqual({
        zero: 0,
        one: 1,
      });
    });
  });
});
