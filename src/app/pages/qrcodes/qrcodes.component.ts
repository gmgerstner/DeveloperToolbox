import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcodes',
  templateUrl: './qrcodes.component.html',
  styleUrls: ['./qrcodes.component.css']
})
export class QRCodesComponent implements OnInit {

  type: string = "text";

  constructor() { }

  ngOnInit(): void {
  }

  drawCanvas(text: string) {
    var QRCode = require('qrcode');
    var canvas = document.getElementById('canvas');

    QRCode.toCanvas(canvas, text, { width: "350" }, function (error: any) {
      if (error) console.error(error);
      console.log('success!');
    });
  }
}
