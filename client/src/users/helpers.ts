export const pluralize = (val: number, word: string): string => {
  const pluralized = `${word}s`;
  return [1, -1].includes(val) ? word : pluralized;
};
