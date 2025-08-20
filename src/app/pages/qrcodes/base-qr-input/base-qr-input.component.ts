import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-qr-input',
  templateUrl: './base-qr-input.component.html',
  styleUrls: ['./base-qr-input.component.css']
})
export class BaseQrInputComponent implements OnInit {

  @Output() contentEvent = new EventEmitter<string>();
  private _content: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  get content(): string {
    return this._content;
  }

  set content(value:string) {
    this._content = value;
  }

  onGenerateClick() {
    this.contentEvent.emit(this.content);
  }
}
