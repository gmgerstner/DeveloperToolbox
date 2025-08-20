const { Base64 } = require('js-base64');

export class Base64Encoder {
  encode(text: string): string {
    Base64.extendString();
    return Base64.encode(text);;
  }

  decode(text: string): string {
    Base64.extendString();
    return Base64.decode(text);
  }
}
