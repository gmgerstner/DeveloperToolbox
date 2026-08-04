import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  standalone: false,
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
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    QRCode.toCanvas(canvas, text, { width: 350 }, function (error: Error | null | undefined) {
      if (error) console.error(error);
      console.log('success!');
    });
  }
}
