import { Component, OnInit } from '@angular/core';
import { Settings } from './settings-box/settings-box.component';

@Component({
  selector: 'data-parser',
  templateUrl: './data-parser.component.html',
  styleUrls: ['./data-parser.component.css']
})
export class DataParserComponent implements OnInit {

  settings: Settings = new Settings;
  inputText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onInputTextChanged(newValue: any) {
    this.inputText = newValue;
  }

  onSettingsChanged(settings: Settings) {
    this.settings = settings;
  }
}
