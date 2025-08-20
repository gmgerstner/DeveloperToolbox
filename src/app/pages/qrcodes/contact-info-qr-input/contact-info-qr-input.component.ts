import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-contact-info-qr-input',
  templateUrl: './contact-info-qr-input.component.html',
  styleUrls: ['./contact-info-qr-input.component.css']
})
export class ContactInfoQrInputComponent extends BaseQrInputComponent {
  prefix: string = "";
  firstName: string = "";
  lastName: string = "";
  phoneNumber: string = "";
  email: string = "";
  birthday: string = "";
  address: string = "";
  website: string = "";
  organization: string = "";
  jobTitle: string = "";
  workPhoneNumber: string = "";

  override get content(): string {
    let value: string = "";

    value += "BEGIN:VCARD\r\n";
    value += "VERSION:4.0\r\n";
    value += `FN:${this.firstName} ${this.lastName}\r\n`;
    if (this.phoneNumber != "") {
      value += `TEL;TYPE=cell:${this.phoneNumber}\r\n`;
    }
    if (this.email != "") {
      value += `EMAIL:${this.email}\r\n`;
    }
    if (this.birthday != "") {
      value += `BDAY:${this.birthday.replace("-","").replace("-","")}\r\n`;
    }
    if (this.address != "") {
      //todo need to parse address
      //value += `ADR;TYPE=home:;;123 Main St.;Springfield;IL;12345;USA\r\n`;
      value += `ADR;TYPE=home:${this.address}\r\n`;
    }
    if (this.website != "") {
      value += `URL:${this.website}\r\n`;
    }
    if (this.organization != "") {
      value += `ORG:${this.organization}\r\n`;
    }
    if (this.jobTitle != "") {
      value += `TITLE:${this.jobTitle}\r\n`;
    }
    if (this.workPhoneNumber != "") {
      value += `TEL;TYPE=work:${this.workPhoneNumber}\r\n`;
    }

    value += "END:VCARD";

    return value;
  }

  clearBirthday() {
    this.birthday = "";
  }
}
