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
}
