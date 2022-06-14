import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinaryField = cloudinaryImage({
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY ?? '',
    apiSecret: 'tCBHwKrFiip23NV8mEnbFIn9BAU',
    cloudName: 'wellnesspro',
  },
  label: 'Imagen',
});
