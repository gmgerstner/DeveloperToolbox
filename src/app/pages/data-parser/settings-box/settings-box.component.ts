import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-box',
  templateUrl: './settings-box.component.html',
  styleUrls: ['./settings-box.component.css']
})
export class SettingsBoxComponent implements OnInit {

  settings: Settings = new Settings;
  @Output() onSettingsChanged = new EventEmitter<Settings>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelimiterChange(entry: string) {
    this.settings.delimiter = entry;
    this.onSettingsChanged.emit(this.settings);
  }

  onDecimalSignChange(entry: string) {
    this.settings.decimalSign = entry;
    this.onSettingsChanged.emit(this.settings);
  }

  onTransformCaseChange(entry: string) {
    this.settings.transformCase = entry;
    this.onSettingsChanged.emit(this.settings);
  }

  onIndentWithChange(entry: string) {
    this.settings.indentWith = entry;
    this.onSettingsChanged.emit(this.settings);
  }

  onFirstRowHeaderChange() {
    this.onSettingsChanged.emit(this.settings);
  }

  onIncludeWhiteSpaceChange() {
    this.onSettingsChanged.emit(this.settings);
  }

}

export class Settings {
  delimiter: string = 'auto';
  decimalSign: string = 'dot';
  firstRowHeader: boolean = true;
  transformCase: string = 'none';
  includeWhiteSpace: boolean = true;
  indentWith: string = 'spaces';
}
