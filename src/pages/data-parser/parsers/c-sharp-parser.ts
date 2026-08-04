import type { Settings } from "../settings";

export class CSharpParser {
  parse(dataGrid: string[][], settings: Settings): string {
    //inits...
    let numRows = dataGrid.length;
    let headerNames: string[] = dataGrid[0];
    const numColumns = headerNames.length;

    // Note: unlike the other converters, the render loop below hardcodes its
    // indentation and line breaks, so the "Indent with" and "Include white
    // space in output" settings do not affect C# output. That was already the
    // case in the Angular version.

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
    let xml: string = "List<row> rows = new List<row>\n{\n";
    for (let i = 1; i < numRows; i++) {
      const row = dataGrid[i];
      xml += '   ' + "new row { ";
      for (let j = 0; j < numColumns; j++) {
        xml += headerNames[j] + '=';
        xml += '"' + row[j] + '", ';
      };
      xml += " }," + '\n';
    };
    xml += "};";


    let outputText = xml;
    outputText += `\n`;
    outputText += `public class row\n`;
    outputText += '{\n';
    for (let i = 0; i < numColumns; i++) {
      outputText += `     public string ${headerNames[i]} ` + '{ get; set; }\n';
    }
    outputText += '}\n';

    return outputText;
  }
}
