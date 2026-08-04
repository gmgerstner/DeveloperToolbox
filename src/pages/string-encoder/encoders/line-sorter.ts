export class LineSorter {
  sort(text: string): string {
    let input: string = text;
    input = input.replace(/\r/g, '');
    const split = input.split('\n');
    const sorted = split.sort((a: string, b: string) =>
      a.toLocaleLowerCase() < b.toLocaleLowerCase() ? -1 : 1,
    );
    let output = '';
    for (let i = 0; i < sorted.length; i++) {
      output += sorted[i] + '\r\n';
    }
    return output;
  }
}
