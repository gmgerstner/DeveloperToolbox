import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-map-qr-input',
  templateUrl: './map-qr-input.component.html',
  styleUrls: ['./map-qr-input.component.css']
})
export class MapQrInputComponent extends BaseQrInputComponent {
  latitude: number = 0;
  latitudeSign: string = "N";
  longitude: number = 0;
  longitudeSign: string = "W";

  override get content(): string {
    return `geo:${this.latitudeSign == "S" ? "-" : ""}${this.latitude},${this.longitudeSign == "W" ? "-" : ""}${this.longitude},0`;
  }

}
