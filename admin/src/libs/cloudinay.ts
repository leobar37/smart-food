import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinaryField = (
  config: Omit<Parameters<typeof cloudinaryImage>[0], 'cloudinary'>,
) =>
  cloudinaryImage({
    cloudinary: {
      apiKey: process.env.CLOUDINARY_API_KEY ?? '',
      apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
      cloudName: process.env.CLOUD_NAME ?? '',
    },
    label: 'Imagen',
    ...config,
  });
