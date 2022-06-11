export const makeDictionay = <T>(arr: T[], property: string) => {
  return arr.reduce((acc, val) => {
    acc[val[property]] = val;
    return acc;
  }, {});
};

export const makeDictionayByIndex = <T>(arr: T[]): Record<any, T> => {
  return arr.reduce((acc, val, idx) => {
    acc[idx + 1] = val;
    return acc;
  }, {});
};
