import { Component, Input, OnInit } from '@angular/core';
import { DataParserCommon } from '../data-parser-common.module';
import { CSharpParser } from '../parsers/c-sharp-parser';
import { HtmlParser } from '../parsers/html-parser';
import { JsonParser } from '../parsers/json-parser';
import { LatexParser } from '../parsers/latex-parser';
import { SqlWithXmlParser } from '../parsers/sql-with-xml-parser';
import { XmlParser } from '../parsers/xml-parser';
import { Settings } from '../settings-box/settings-box.component';

@Component({
  selector: 'app-output-box',
  templateUrl: './output-box.component.html',
  styleUrls: ['./output-box.component.css']
})
export class OutputBoxComponent implements OnInit {

  @Input() inputText: string = "";
  @Input() settings: Settings = new Settings;
  converterType: string = 'xml';
  outputText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  parse() {
    //var errors = [];

    //test for delimiter
    //count the number of commas
    var RE = new RegExp("[^,]", "gi");
    var numCommas = this.inputText.replace(RE, "").length;

    //set delimiter
    let columnDelimiter = ",";

    if (this.settings.delimiter === "comma") {
      columnDelimiter = ",";
    } else if (this.settings.delimiter === "tab") {
      columnDelimiter = "\t";
    } else if (this.settings.delimiter == 'auto') {
      //count the number of tabs
      RE = new RegExp("[^\t]", "gi");
      let numTabs = this.inputText.replace(RE, "").length;
      if (numTabs > numCommas) {
        columnDelimiter = "\t"
      }
    }

    let parsedArray = DataParserCommon.CSVToArray(this.inputText, columnDelimiter);
    if (this.converterType == "xml") {
      let parser = new XmlParser;
      let parsedText = parser.parse(parsedArray, this.settings);
      this.outputText = parsedText;
    } else if (this.converterType == "sql-with-xml") {
      let parser = new SqlWithXmlParser;
      let parsedText = parser.parse(parsedArray, this.settings);
      this.outputText = parsedText;
    } else if (this.converterType == "csharp") {
      let parser = new CSharpParser;
      let parsedText = parser.parse(parsedArray, this.settings);
      this.outputText = parsedText;
    } else if (this.converterType == "html") {
      let parser = new HtmlParser;
      let parsedText = parser.parse(parsedArray, this.settings);
      this.outputText = parsedText;
    } else if (this.converterType == "json") {
      let parser = new JsonParser;
      let parsedText = parser.parse(parsedArray, this.settings);
      this.outputText = parsedText;
    } else if (this.converterType == "latex") {
      let parser = new LatexParser;
      let parsedText = parser.parse(parsedArray, this.settings);
      this.outputText = parsedText;
    }
  }

  copy() {
    const el = document.createElement('textarea');
    el.value = this.outputText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    alert("Link copied to clipboard");
  }
}
