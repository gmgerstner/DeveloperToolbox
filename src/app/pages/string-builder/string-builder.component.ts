import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-builder',
  templateUrl: './string-builder.component.html',
  styleUrls: ['./string-builder.component.css']
})
export class StringBuilderComponent implements OnInit {

  content: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    this.download("code.cs", this.output);
  }

  onClear() {
    this.content = "";
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
    file.text().then(r => this.content = r.toString());
  }

  get output(): string {
    let input: string = this.content;
    input = input.replace(/\r/g, "");
    input = input.replace(/"/g, '\\"');

    let text = "string text =";
    let lines = input.split("\n");
    if (lines.length == 0 || lines[0] == "") return "";

    for (let i = 0; i < lines.length; i++) {
      text += `\r\n\t${i != 0 ? '+' : ''}"${lines[i] == "\n" || lines[i] == "" ? '' : lines[i]}\\r\\n"`;
    }
    text += ";\r\n";

    return text;
  }

}
