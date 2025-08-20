import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-guidgenerator',
  templateUrl: './guidgenerator.component.html',
  styleUrls: ['./guidgenerator.component.css']
})
export class GUIDGeneratorComponent implements OnInit {
  guids: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  generateGuids() {
    this.guids = "";
    for (let i = 0; i < 10; i++) {
      let myuuid = uuidv4();
      this.guids += `${myuuid}\r\n`;
    }
  }

}
