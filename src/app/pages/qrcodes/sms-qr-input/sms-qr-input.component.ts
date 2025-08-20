import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-sms-qr-input',
  templateUrl: './sms-qr-input.component.html',
  styleUrls: ['./sms-qr-input.component.css']
})
export class SmsQrInputComponent extends BaseQrInputComponent {
  phone: string = "";

  override get content(): string {
    return `sms:${this.phone}`;
  }
}
