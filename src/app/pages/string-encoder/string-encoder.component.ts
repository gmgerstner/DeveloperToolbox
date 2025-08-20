import { Component, OnInit } from '@angular/core';
import { HtmlEncoder } from './encoders/html-encoder';
import { Base32Encoder } from './encoders/base32-encoder';
import { Base64Encoder } from './encoders/base64-encoder';
import { UrlEncoder } from './encoders/url-encoder';
import { LineSorter } from './encoders/line-sorter';
import { SHA512Encoder } from './encoders/sha512-encoder';

@Component({
  selector: 'app-string-encoder',
  templateUrl: './string-encoder.component.html',
  styleUrls: ['./string-encoder.component.css']
})
export class StringEncoderComponent implements OnInit {

  input: string = "";
  currentAlg: string = "Sort Lines";

  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    this.input = "";
  }

  onSave() {
    this.download("file.txt", this.output);
  }

  onCopy() {
    const el = document.createElement('textarea');
    el.value = this.output;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    alert("Output copied to clipboard");
  }

  download(filename: string, text: string) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  onFileUpload(event: any) {
    const file: File = event.target.files[0];
    file.text().then(r => this.input = r.toString());
  }

  get output(): string {
    if (this.currentAlg == "HTML Encode") {
      let coder = new HtmlEncoder();
      return coder.encode(this.input);
    }
    else if (this.currentAlg == "HTML Decode") {
      let coder = new HtmlEncoder();
      return coder.decode(this.input);
    }
    else if (this.currentAlg == "Base32 Encode") {
      let coder = new Base32Encoder();
      return coder.encode(this.input);
    }
    else if (this.currentAlg == "Base32 Decode") {
      let coder = new Base32Encoder();
      return coder.decode(this.input);
    }
    else if (this.currentAlg == "Base64 Encode") {
      let coder = new Base64Encoder();
      return coder.encode(this.input);
    }
    else if (this.currentAlg == "Base64 Decode") {
      let coder = new Base64Encoder();
      return coder.decode(this.input);
    }
    else if (this.currentAlg == "URL Encode") {
      let coder = new UrlEncoder();
      return coder.encode(this.input);
    }
    else if (this.currentAlg == "URL Decode") {
      let coder = new UrlEncoder();
      return coder.decode(this.input);
    }
    else if (this.currentAlg == "Sort Lines") {
      let coder = new LineSorter();
      return coder.sort(this.input);
    }
    else if (this.currentAlg == "SHA512 Hash") {
      let coder = new SHA512Encoder();
      return coder.encode(this.input);
    }

    return "Unknown or unsuported selection: " + this.currentAlg;
  }

}
