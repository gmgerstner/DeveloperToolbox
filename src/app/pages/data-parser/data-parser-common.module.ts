import { ParseResults } from "./parsers/parse-results";

export class DataParserCommon {

  isDecimal_re: RegExp = /^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/;

  //---------------------------------------
  // UTILS
  //---------------------------------------

  isNumber(value: string): boolean {
    if ((value == null) || isNaN(Number(value))) {
      return false;
    }
    return true;
  }


  //---------------------------------------
  // PARSE
  //---------------------------------------
  //let parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

  parse(input: string, headersIncluded: boolean, delimiterType: string, downcaseHeaders: boolean, upcaseHeaders: boolean, decimalSign: string): ParseResults {

    let dataArray = [];

    let errors = [];

    //test for delimiter
    //count the number of commas
    let RE = new RegExp("[^,]", "gi");
    let numCommas = input.replace(RE, "").length;

    //count the number of tabs
    RE = new RegExp("[^\t]", "gi");
    let numTabs = input.replace(RE, "").length;

    let rowDelimiter = "\n";
    //set delimiter
    let columnDelimiter = ",";
    if (numTabs > numCommas) {
      columnDelimiter = "\t"
    };

    if (delimiterType === "comma") {
      columnDelimiter = ","
    } else if (delimiterType === "tab") {
      columnDelimiter = "\t"
    }


    // kill extra empty lines
    RE = new RegExp("^" + rowDelimiter + "+", "gi");
    input = input.replace(RE, "");
    RE = new RegExp(rowDelimiter + "+$", "gi");
    input = input.replace(RE, "");

    // let arr = input.split(rowDelimiter);
    //
    // for (let i=0; i < arr.length; i++) {
    //   dataArray.push(arr[i].split(columnDelimiter));
    // };


    // dataArray = jQuery.csv(columnDelimiter)(input);
    dataArray = DataParserCommon.CSVToArray(input, columnDelimiter);

    //escape out any tabs or returns or new lines
    for (let i = dataArray.length - 1; i >= 0; i--) {
      for (let j = dataArray[i].length - 1; j >= 0; j--) {
        dataArray[i][j] = dataArray[i][j].replace("\t", "\\t");
        dataArray[i][j] = dataArray[i][j].replace("\n", "\\n");
        dataArray[i][j] = dataArray[i][j].replace("\r", "\\r");
      };
    };


    let headerNames = [];
    let headerTypes = [];
    let numColumns = dataArray[0].length;
    let numRows = dataArray.length;
    if (headersIncluded) {

      //remove header row
      headerNames = dataArray.splice(0, 1)[0];
      numRows = dataArray.length;

    } else { //if no headerNames provided

      //create generic property names
      for (let i = 0; i < numColumns; i++) {
        headerNames.push("val" + String(i));
        headerTypes.push("");
      };

    }


    if (upcaseHeaders) {
      for (let i = headerNames.length - 1; i >= 0; i--) {
        headerNames[i] = headerNames[i].toUpperCase();
      };
    };
    if (downcaseHeaders) {
      for (let i = headerNames.length - 1; i >= 0; i--) {
        headerNames[i] = headerNames[i].toLowerCase();
      };
    };

    //test all the rows for proper number of columns.
    for (let i = 0; i < dataArray.length; i++) {
      let numValues = dataArray[i].length;
      if (numValues != numColumns) { this.log("Error parsing row " + String(i) + ". Wrong number of columns.") };
    };

    //test columns for number data type
    let numRowsToTest = dataArray.length;
    let threshold = 0.9;
    for (let i = 0; i < headerNames.length; i++) {
      let numFloats = 0;
      let numInts = 0;
      for (let r = 0; r < numRowsToTest; r++) {
        if (dataArray[r]) {
          //replace comma with dot if comma is decimal separator
          if (decimalSign == 'comma' && this.isDecimal_re.test(dataArray[r][i])) {
            dataArray[r][i] = dataArray[r][i].replace(",", ".");
          }
          if (this.isNumber(dataArray[r][i])) {
            numInts++
            if (String(dataArray[r][i]).indexOf(".") > 0) {
              numFloats++
            }
          };
        };

      };

      if ((numInts / numRowsToTest) > threshold) {
        if (numFloats > 0) {
          headerTypes[i] = "float"
        } else {
          headerTypes[i] = "int"
        }
      } else {
        headerTypes[i] = "string"
      }
    }

    let results: ParseResults =
    {
      dataGrid: dataArray,
      headerNames: headerNames,
      headerTypes: headerTypes,
      errors: this.getLog()
    };

    return results;
  }


  //---------------------------------------
  // ERROR LOGGING
  //---------------------------------------
  errorLog: any = [];

  resetLog(): void {
    this.errorLog = [];
  }

  log(l: string): void {
    this.errorLog.push(l);
  }

  getLog(): string {
    let out = "";
    if (this.errorLog.length > 0) {
      for (let i = 0; i < this.errorLog.length; i++) {
        out += ("!!" + this.errorLog[i] + "!!\n");
      };
      out += "\n"
    };

    return out;
  }



  //---------------------------------------
  // UTIL
  //---------------------------------------

  // This Function from Ben Nadel, http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
  // This will parse a delimited string into an array of
  // arrays. The default delimiter is the comma, but this
  // can be overriden in the second argument.
  public static CSVToArray(strData: string, strDelimiter: string): any {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    let objPattern = new RegExp(
      (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    let arrData: any = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    let arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

      // Get the delimiter that was found.
      let strMatchedDelimiter = arrMatches[1];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
        strMatchedDelimiter.length &&
        (strMatchedDelimiter != strDelimiter)
      ) {

        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);

      }


      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      let strMatchedValue: string;
      if (arrMatches[2]) {

        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );

      } else {

        // We found a non-quoted value.
        strMatchedValue = arrMatches[3];
      }


      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
  }

}
