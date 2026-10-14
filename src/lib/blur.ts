/** Tiny pre-blurred copy of a photo in /public (made by `npm run images:dims`), for soft backdrops. */
export function blurSrc(src: string) {
  return `/blur${src.replace(/\.[^.]+$/, ".webp")}`;
}
