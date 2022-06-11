export const createMapper = (dictionary: any, prop?: string) =>
  Object.keys(dictionary).reduce((acc, curr) => {
    acc[curr] = dictionary[curr][prop ?? 'id'];
    return acc;
  }, {});
