// https://wa.me/${phone}/?text=

export const buildWtsMessage = (text: string) => {
  return `https://wa.me/+51927939769/?text=${encodeURIComponent(text)}`;
};
