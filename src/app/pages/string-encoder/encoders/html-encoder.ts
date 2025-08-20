const HTMLDecoderEncoder = require("html-encoder-decoder");

export class HtmlEncoder {
  encode(text: string): string {
    return HTMLDecoderEncoder.encode(text);
  }

  decode(text: string): string {
    return HTMLDecoderEncoder.decode(text);
  }
}
