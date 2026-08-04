import { decode, encode } from 'url-encode-decode';

export class UrlEncoder {
  encode(text: string): string {
    return encode(text);
  }

  decode(text: string): string {
    return decode(text);
  }
}
