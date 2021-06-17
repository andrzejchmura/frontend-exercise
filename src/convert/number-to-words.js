import { tokenize } from "./utils";
import { numerals } from "./dictionary";

const convertOneDigit = (input) => {
  return numerals[input];
};

const convertTwoDigits = (input) => {
  if (numerals[input] !== undefined) {
    return numerals[input];
  }

  const [tens, ones] = input.split("");

  if (tens === "0") {
    return convertOneDigit(ones);
  }

  return `${numerals[tens * 10]} ${convertOneDigit(ones)}`;
};

const convertThreeDigits = (input, omitConjunction) => {
  if (input === "000") {
    return "";
  }

  const [hundreds, tens, ones] = input.split("");
  const tensAndOnes = [tens, ones].join("");

  if (tens === "0" && ones === "0") {
    return `${convertOneDigit(hundreds)} hundred`;
  }

  if (hundreds === "0") {
    return omitConjunction
      ? `${convertTwoDigits(tensAndOnes)}`
      : `and ${convertTwoDigits(tensAndOnes)}`;
  }

  return `${convertOneDigit(hundreds)} hundred and ${convertTwoDigits(tensAndOnes)}`;
};

const convertGroup = (input, omitConjunction = false) => {
  switch (input.length) {
    case 1:
      return convertOneDigit(input);
    case 2:
      return convertTwoDigits(input);
    case 3:
      return convertThreeDigits(input, omitConjunction);
    default:
      return "";
  }
};

export const convertNumberToWords = (rawInput) => {
  const groups = tokenize(rawInput);

  switch (groups.length) {
    case 1: {
      const [hundreds] = groups;

      return `${convertGroup(hundreds)}`;
    }
    case 2: {
      const [thousands, hundreds] = groups;

      return `${convertGroup(thousands)} thousand ${convertGroup(hundreds)}`.trim();
    }
    case 3: {
      const [millions, thousands, hundreds] = groups;

      if (thousands === "000") {
        return `${convertGroup(millions)} million ${convertGroup(hundreds)}`.trim();
      }

      return `${convertGroup(millions)} million ${convertGroup(thousands, true)} thousand ${convertGroup(hundreds)}`.trim();
    }
    default:
      return "";
  }
};
