import { Settings } from "../settings-box/settings-box.component";

export class LatexParser {
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
    outputText += "\\begin{table}[";
    for (let i = 0; i < numColumns; i++) {
      outputText += "l";
    }
    outputText += "]" + newLine;

    //header
    for (let i = 0; i < 1; i++) {
      let row = dataGrid[i];
      for (let j = 0; j < numColumns; j++) {
        outputText += indent;
        outputText += "\\textbf{";
        outputText += row[j];
        outputText += "} " + (j < numColumns - 1 ? "&" : "");
      };
      outputText += "\\\\";
      outputText += newLine;
    };

    //body
    for (let i = 1; i < numRows; i++) {
      let row = dataGrid[i];
      for (let j = 0; j < numColumns; j++) {
        outputText += indent;
        outputText += row[j];
        outputText += " " + (j < numColumns - 1 ? "&" : "");
      };
      outputText += "\\\\";
      outputText += newLine;
    };


    outputText += "\\end{table}";

    return outputText;
  }
}
