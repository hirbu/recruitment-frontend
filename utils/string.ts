export const capitalizeWordsSeparatedByUnderscores = (
  input: string,
): string => {
  return input
    .split("_")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

export const capitalizeWordsInString = (input: string): string => {
  return input.split(" ").map(capitalizeWordsSeparatedByUnderscores).join(" ");
};

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
