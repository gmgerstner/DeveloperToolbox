import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-email-qr-input',
  templateUrl: './email-qr-input.component.html',
  styleUrls: ['./email-qr-input.component.css']
})
export class EmailQrInputComponent extends BaseQrInputComponent {
  email: string = "";
  override get content(): string {
    return `mailto:${this.email}`;
  }
}
