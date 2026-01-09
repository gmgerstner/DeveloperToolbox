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

    // Detect path separator
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
    // Normalize the path and split by delimiter
    const normalized = path.replace(/^[A-Za-z]:/, '').replace(/^[\/\\]+/, '').replace(/[\/\\]+$/, '');
    return normalized.split(new RegExp(`[${delimiter === '/' ? '/' : '\\\\'}]+`)).filter(part => part.length > 0);
  }

  private calcRelativePath(fromArray: string[], toArray: string[], splitBy: string): string {
    // Find the common prefix length
    let commonLength = 0;
    const minLength = Math.min(fromArray.length, toArray.length);
    
    for (let i = 0; i < minLength; i++) {
      if (fromArray[i] === toArray[i]) {
        commonLength++;
      } else {
        break;
      }
    }

    // Calculate how many levels to go up
    const upLevels = fromArray.length - commonLength;
    
    // Get the remaining path from target
    const remainingPath = toArray.slice(commonLength);

    // Build the relative path
    let result = '';
    
    // Add ".." for each level up
    for (let i = 0; i < upLevels; i++) {
      result += '..' + splitBy;
    }
    
    // Add the remaining path
    if (remainingPath.length > 0) {
      result += remainingPath.join(splitBy);
    }

    // Handle edge cases
    if (!result) {
      result = '.'; // Same directory
    } else if (result.endsWith(splitBy)) {
      result = result.slice(0, -1); // Remove trailing separator
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
