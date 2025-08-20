import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lorem-ipsum',
  templateUrl: './lorem-ipsum.component.html',
  styleUrls: ['./lorem-ipsum.component.css']
})
export class LoremIpsumComponent implements OnInit {

  output: string = "";
  length: number = 1;
  type: string = "paragraph";
  startLorem: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  generateClicked() {
    let url = `${environment.loremipsumUrl}?type=${this.type.toLowerCase()}&length=${this.length}&startLorem=${this.startLorem}`;
    this.http.get<string>(url)
      .subscribe((r: any) =>
        this.output = r.text
      );
  }
}
