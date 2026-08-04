import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {

  inputText: string = "";
  @Output() onInputTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.onInputTextChanged.emit(this.inputText);
  }
}
