import type { Settings } from "../settings";

export class JsonParser {
  parse(dataGrid: string[][], settings: Settings): string {
    //inits...
    let numRows = dataGrid.length;
    let headerNames: string[] = dataGrid[0];
    const numColumns = headerNames.length;
    let indent: string = settings.indentWith == 'spaces' ? '   ' : '\t';
    let newLine: string = '\n';

    if (!settings.includeWhiteSpace) {
      newLine = '';
      indent = '';
    }

    if (!settings.firstRowHeader) {
      const newFirstRow: string[] = [];
      for (let i = 0; i < numColumns; i++) {
        const title: string = 'field' + i;
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
    let outputText = "[" + newLine;
    for (let i = 1; i < numRows; i++) {
      const row = dataGrid[i];
      outputText += indent + "{ ";
      for (let j = 0; j < numColumns; j++) {
        outputText += '"' + headerNames[j] + '"' + ':';
        outputText += '"' + row[j] + '" ';
        outputText += (j < numColumns - 1 ? "," : "")
      };
      outputText += "}" + (i < numRows - 1 ? "," : "") + newLine;
    };
    outputText += "]";

    return outputText;
  }
}
