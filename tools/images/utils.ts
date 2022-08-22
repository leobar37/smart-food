import glob from 'glob';
export function getListOfFiles(
  globPath: string,
  exclude?: string | string[],
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const options = exclude ? { ignore: exclude } : {};
    glob(globPath, options, (error, matches) => {
      if (error) {
        return reject(error);
      }
      resolve(matches);
    });
  });
}
