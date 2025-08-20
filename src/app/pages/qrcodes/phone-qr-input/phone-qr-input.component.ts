import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-phone-qr-input',
  templateUrl: './phone-qr-input.component.html',
  styleUrls: ['./phone-qr-input.component.css']
})
export class PhoneQrInputComponent extends BaseQrInputComponent {
  phone: string = "";

  override get content(): string {
    return `tel:${this.phone}`;
  }
}
