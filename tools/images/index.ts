import { getListOfFiles } from './utils';
import { resolve } from 'path';
import sharp from 'sharp';

const prefix = 'smart';

let counter = 0;

getListOfFiles('./images/*.jpg').then(async (list) => {
  console.log('😶 processing images');
  for await (const path of list) {
    const imagePath = resolve(path);
    counter++;
    await sharp(imagePath)
      .resize(1920, 1080)
      .resize(1920, 1920)
      .webp({ force: true })
      .toFile(`./out/${prefix}${counter}.webp`);
    console.log(`😶 imagen ${path} transformed`);
  }
});

export {};
