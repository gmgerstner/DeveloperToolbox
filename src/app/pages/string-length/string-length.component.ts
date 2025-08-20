import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-length',
  templateUrl: './string-length.component.html',
  styleUrls: ['./string-length.component.css']
})
export class StringLengthComponent implements OnInit {

  content: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    this.content = "";
  }

  onCopy() {
    const el = document.createElement('textarea');
    el.value = this.content;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    alert("Contents copied to clipboard");
  }

  onSave() {
    this.download("content.txt", this.content);
  }

  onFileUpload(event: any) {
    const file: File = event.target.files[0];
    file.text().then(r => this.content = r.toString());
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

  get characterCount(): number {
    return this.content.length;
  }

  get wordCount(): number {
    if (!this.content || this.content.trim() === '') {
      return 0;
    }
    
    // Split by whitespace and filter out empty strings
    const words = this.content.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  }

  get lineCount(): number {
    if (!this.content) {
      return 0;
    }
    
    // Count lines by splitting on line breaks
    const lines = this.content.split(/\r\n|\r|\n/);
    return lines.length;
  }

  get characterCountNoSpaces(): number {
    return this.content.replace(/\s/g, '').length;
  }
}