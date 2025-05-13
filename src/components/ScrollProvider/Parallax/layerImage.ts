export function layerImage(imageUrl: string) {
  if (!imageUrl) return {};
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
}
