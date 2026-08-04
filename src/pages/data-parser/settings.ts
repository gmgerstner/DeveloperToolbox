export interface Settings {
  delimiter: string;
  decimalSign: string;
  firstRowHeader: boolean;
  transformCase: string;
  includeWhiteSpace: boolean;
  indentWith: string;
}

export const defaultSettings: Settings = {
  delimiter: 'auto',
  decimalSign: 'dot',
  firstRowHeader: true,
  transformCase: 'none',
  includeWhiteSpace: true,
  indentWith: 'spaces',
};
