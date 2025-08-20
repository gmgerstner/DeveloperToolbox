import { Settings } from "../settings-box/settings-box.component";

export class SqlWithXmlParser {
  parse(dataGrid: [any[]], settings: Settings): string {
    //inits...
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
    let xml : string = "<rows>" + newLine;
    for (let i = 1; i < numRows; i++) {
      let row = dataGrid[i];
      xml += indent + "<row ";
      for (let j = 0; j < numColumns; j++) {
        xml += headerNames[j] + '=';
        xml += '"' + row[j] + '" ';
      };
      xml += "></row>" + newLine;
    };
    xml += "</rows>";


    let outputText = `DECLARE @xmldata XML = '${xml}'\n\n`;
    outputText += 'SELECT\n';
    for (let i = 0; i < numColumns; i++) {
      outputText += `     Tbl.Col.value('@${headerNames[i]}', 'varchar(max)') ${headerNames[i]}${i +1 < numColumns ? ',' : '' }\n`;
    }
    outputText += "FROM @xmldata.nodes('/rows/row') Tbl(Col)";

    return outputText;
  }
}
