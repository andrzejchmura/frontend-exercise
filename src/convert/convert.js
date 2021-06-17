import { isNumeric, isVerbal } from "./utils";
import { convertNumberToWords } from "./number-to-words";
import { convertWordsToNumber } from "./words-to-number";

export function convert(rawInput) {
  const input = rawInput.trim();

  if (input === "") {
    return "";
  }

  if (isNumeric(input)) {
    const number = Number(input);

    if (number > 999999999 || number < 0) {
      return "This number is out of range";
    }

    return convertNumberToWords(String(number));
  } else if (isVerbal(input)) {
    return convertWordsToNumber(input);
  } else {
    return "Please provide a number using either digits or words.";
  }
}
