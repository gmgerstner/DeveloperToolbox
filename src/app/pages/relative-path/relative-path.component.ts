import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relative-path',
  templateUrl: './relative-path.component.html',
  styleUrls: ['./relative-path.component.css']
})
export class RelativePathComponent implements OnInit {
  firstPath: string = '';
  secondPath: string = '';
  result1: string = '';
  result2: string = '';
  showResults: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  calculate(): void {
    if (!this.firstPath || !this.secondPath) {
      return;
    }

    const isUnix = this.firstPath.indexOf('/') > -1;
    const splitBy = isUnix ? '/' : '\\';

    // Parse paths
    const firstArray = this.parsePath(this.firstPath, splitBy);
    const secondArray = this.parsePath(this.secondPath, splitBy);

    // Calculate both relative paths
    this.result1 = this.calcRelativePath(firstArray, secondArray, splitBy);
    this.result2 = this.calcRelativePath(secondArray, firstArray, splitBy);
    this.showResults = true;
  }

  private parsePath(path: string, delimiter: string): string[] {
    if (delimiter === '/') {
      return path.split(/\/(.+)?/)[1]?.replace(/^\/|\/$/g, '').split('/') || [];
    } else {
      return path.split(/\\(.+)?/)[1]?.replace(/^\\|\\$/g, '').split('\\') || [];
    }
  }

  private calcRelativePath(fromArray: string[], toArray: string[], splitBy: string): string {
    let result = '';
    let nonMatch = 0;
    let upLevelCt = 0;
    let thereWasAChange = false;

    // Find common path and count differences
    for (let index = 0; index < fromArray.length; index++) {
      nonMatch = index;

      if (toArray[index] && fromArray[index] === toArray[index] && !thereWasAChange) {
        continue;
      } else if (toArray[index] && fromArray[index] !== toArray[index] || (thereWasAChange && toArray[index])) {
        thereWasAChange = true;

        if (toArray.length - 1 !== index && fromArray.length - 1 !== index) {
          upLevelCt++;
        }
        if (fromArray[index + 1]) {
          // Add intermediate differences (these will be added to result later)
        }
      } else if ((toArray[index] && fromArray[index] !== toArray[index]) || !(index < toArray.length)) {
        upLevelCt++;
      }
    }

    // Add parent directory references
    for (let i = 0; i < upLevelCt; i++) {
      result += '..' + splitBy;
    }

    // Add the remaining path from the target
    const remainingPath = toArray.slice(nonMatch);
    if (remainingPath.length > 0) {
      result += remainingPath.join(splitBy);
    }

    // Handle current directory notation
    if (result && !result.startsWith('..')) {
      result = '.' + splitBy + result;
    } else if (!result) {
      result = '.';
    }

    // Remove trailing separator
    if (result.endsWith(splitBy) && result.length > 1) {
      result = result.slice(0, -1);
    }

    return result;
  }

  reset(): void {
    this.firstPath = '';
    this.secondPath = '';
    this.result1 = '';
    this.result2 = '';
    this.showResults = false;
  }

  copyToClipboard(text: string): void {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied to clipboard!');
  }
}
