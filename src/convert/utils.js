export const invert = (obj) => {
  const inverted = {};
  Object.keys(obj).forEach((key) => {
    inverted[obj[key]] = Number(key);
  });
  return inverted;
};

export function tokenize(text) {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, " ").split(" ");
}

export const isNumeric = (string) => /^\d+$/.test(string);

export const isVerbal = (string) => /^[a-zA-Z ]*$/.test(string);
