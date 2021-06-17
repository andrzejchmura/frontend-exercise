import { numerals, magnitudes } from "./dictionary";
import { invert } from "./utils";

const invertedNumerals = invert(numerals);
const invertedMagnitudes = invert(magnitudes);

export const convertWordsToNumber = (rawInput) => {
  const input = rawInput.split(" ");
  let result = 0;
  let accumulator = 0;

  for (let i = 0; i < input.length; i++) {
    const word = input[i];

    if (word === "and") {
      continue;
    }

    const magnitude = invertedMagnitudes[word];
    const numeral = invertedNumerals[word];

    if (magnitude !== undefined) {
      if (magnitude === 100) {
        accumulator = accumulator * magnitude;
      } else {
        result = result + accumulator * magnitude;
        accumulator = 0;
      }
    } else if (numeral !== undefined) {
      accumulator = accumulator + numeral;
    } else {
      return "Sorry, could not parse the text correctly";
    }
  }

  return String(result + accumulator);
};
