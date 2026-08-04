/**
 * Neither of these packages ships type declarations, and there are no
 * @types/... packages for them. The Angular version dodged this by loading them
 * through `require()`, which typed them as `any`.
 */

declare module 'html-encoder-decoder' {
  const HTMLDecoderEncoder: {
    encode(text: string): string;
    decode(text: string): string;
  };
  export default HTMLDecoderEncoder;
}

declare module 'url-encode-decode' {
  export function encode(text: string): string;
  export function decode(text: string): string;
}
