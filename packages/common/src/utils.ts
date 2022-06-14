export const sleep = (ms = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const isDev = process.env.NODE_ENV === 'development';
