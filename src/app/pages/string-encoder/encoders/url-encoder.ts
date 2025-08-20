const { encode, decode } = require('url-encode-decode')

export class UrlEncoder {
  encode(text: string): string {
    console.log("url-encode");
    return encode(text);
  }

  decode(text: string): string {
    console.log("url-decode");
    return decode(text);
  }
}
