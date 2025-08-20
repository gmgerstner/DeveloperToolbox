import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-calendar-qr-input',
  templateUrl: './calendar-qr-input.component.html',
  styleUrls: [
    './calendar-qr-input.component.css',
    './ical-style.css'  ]
})
export class CalendarQrInputComponent extends BaseQrInputComponent {
  startDate = new Date(1990, 0, 1);

  override get content(): string {
    //https://en.wikipedia.org/wiki/ICalendar#/media/File:ICalendarSpecification.png

    let text: string =
      "BEGIN:VCALENDAR\r\n"
      + "VERSION:2.0\r\n"
      + "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\r\n"

      + "BEGIN:VEVENT\r\n"
      + "UID:uid1@example.com\r\n"
      + "DTSTAMP:19970714T170000Z\r\n"
      + "ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\r\n"
      + "DTSTART:19970714T170000Z\r\n"
      + "DTEND:19970715T040000Z\r\n"
      + "SUMMARY:Bastille Day Party\r\n"
      + "GEO:48.85299;2.36885\r\n"
      + "END:VEVENT\r\n"

      + "END:VCALENDAR\r\n";

    return text;
  }
}
