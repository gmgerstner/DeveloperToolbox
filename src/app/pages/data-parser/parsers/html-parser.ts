import { Settings } from "../settings-box/settings-box.component";

export class HtmlParser {
  parse(dataGrid: [any[]], settings: Settings): string {
    //inits...
    let outputText = "";
    let numRows = dataGrid.length;
    let headerNames: string[] = dataGrid[0];
    let numColumns = headerNames.length;
    let indent: string = settings.indentWith == 'spaces' ? '   ' : '\t';
    let newLine: string = '\n';

    if (!settings.includeWhiteSpace) {
      newLine = '';
      indent = '';
    }

    if (!settings.firstRowHeader) {
      let newFirstRow: any[] = [];
      for (let i = 0; i < numColumns; i++) {
        let title: any = 'field' + i;
        newFirstRow.push(title);
      }
      dataGrid.unshift(newFirstRow);
      numRows++;
      headerNames = dataGrid[0];
    }

    if (settings.transformCase == 'upcase') {
      for (let i = 0; i < numColumns; i++) {
        headerNames[i] = headerNames[i].toUpperCase();
      }
    } else if (settings.transformCase == 'downcase') {
      for (let i = 0; i < numColumns; i++) {
        headerNames[i] = headerNames[i].toLowerCase();
      }
    }

    //begin render loop
    outputText += "<table>" + newLine;

    //thead
    outputText += indent + "<thead>" + newLine;
    for (let i = 0; i < 1; i++) {
      let row = dataGrid[i];
      outputText += indent + indent + "<tr>" + newLine;
      for (let j = 0; j < numColumns; j++) {
        outputText += indent + indent + indent;
        outputText += "<th>";
        outputText += row[j];
        outputText += "</th>" + newLine;
      };
      outputText += indent + indent + "</tr>" + newLine;
    };
    outputText += "</thead>" + newLine;

    //tbody
    outputText += indent + "<tbody>" + newLine;
    for (let i = 1; i < numRows; i++) {
      let row = dataGrid[i];
      outputText += indent + indent + "<tr>" + newLine;
      for (let j = 0; j < numColumns; j++) {
        outputText += indent + indent + indent;
        outputText += "<td>";
        outputText += row[j];
        outputText += "</td>" + newLine;
      };
      outputText += indent + indent + "</tr>" + newLine;
    };
    outputText += "</tbody>" + newLine;


    outputText += "</table>";

    return outputText;
  }
}
