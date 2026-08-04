import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';
import './CalendarQrInput.css';
import './ical-style.css';

const HOURS = [
  ['00', '00 (12am)'], ['01', '01 (1am)'], ['02', '02 (2am)'], ['03', '03 (3am)'],
  ['04', '04 (4am)'], ['05', '05 (5am)'], ['06', '06 (6am)'], ['07', '07 (7am)'],
  ['08', '08 (8am)'], ['09', '09 (9am)'], ['10', '10 (10am)'], ['11', '11 (11am)'],
  ['12', '12 (12pm)'], ['13', '13 (1pm)'], ['14', '14 (2pm)'], ['15', '15 (3pm)'],
  ['16', '16 (4pm)'], ['17', '17 (5pm)'], ['18', '18 (6pm)'], ['19', '19 (7pm)'],
  ['20', '20 (8pm)'], ['21', '21 (9pm)'], ['22', '22 (10pm)'], ['23', '23 (11pm)'],
];

const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

/**
 * The event fields below are not wired up yet - the payload is still the fixed
 * sample event the Angular component emitted. This input is also not reachable
 * from the QR Codes page, same as before the React port.
 *
 * https://en.wikipedia.org/wiki/ICalendar#/media/File:ICalendarSpecification.png
 */
function buildICalendar(): string {
  return (
    'BEGIN:VCALENDAR\r\n' +
    'VERSION:2.0\r\n' +
    'PRODID:-//hacksw/handcal//NONSGML v1.0//EN\r\n' +
    'BEGIN:VEVENT\r\n' +
    'UID:uid1@example.com\r\n' +
    'DTSTAMP:19970714T170000Z\r\n' +
    'ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\r\n' +
    'DTSTART:19970714T170000Z\r\n' +
    'DTEND:19970715T040000Z\r\n' +
    'SUMMARY:Bastille Day Party\r\n' +
    'GEO:48.85299;2.36885\r\n' +
    'END:VEVENT\r\n' +
    'END:VCALENDAR\r\n'
  );
}

export default function CalendarQrInput({ onGenerate }: QrInputProps) {
  return (
    <QrInputCard
      title="Calendar Event"
      className="calendar-qr"
      onGenerate={() => onGenerate(buildICalendar())}
    >
      <form id="eventForm" noValidate>
        <div className="form-group row mb-2">
          <label htmlFor="summary" className="col-2 col-form-label ical-form-label">
            Event Title<span className="req-field">*</span>
          </label>
          <div className="col-10">
            <input type="text" className="form-control required" id="summary" name="summary" size={40} />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="allDayYes" className="col-2 col-form-label ical-form-label">All Day</label>
          <div className="col-10 pt-2">
            <input type="radio" id="allDayYes" name="dateType" className="ms-1" />
            <div className="edit-allday-yesno ms-1">Yes</div>
            <input type="radio" id="allDayNo" name="dateType" defaultChecked className="ms-2" />
            <div className="edit-allday-yesno ms-1">No</div>
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="dateStart" className="col-2 col-form-label ical-form-label">
            Date<span className="req-field">*</span>
          </label>
          <div className="col-10" style={{ position: 'relative' }}>
            <input type="text" className="form-control required ical-date" id="dateStart" name="dateStart" maxLength={10} size={12} readOnly />
            <select name="dateStartHour" id="dateStartHour" className="form-select ical-hour" defaultValue="00">
              {HOURS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <select name="dateStartMin" id="dateStartMin" className="form-select ical-time" defaultValue="00">
              {MINUTES.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="dateEnd" className="col-2 col-form-label ical-form-label">Date End</label>
          <div className="col-10" style={{ position: 'relative' }}>
            <input type="text" className="form-control ical-date required" id="dateEnd" name="dateEnd" maxLength={10} size={12} readOnly />
            <select name="dateEndHour" id="dateEndHour" className="form-select ical-hour" defaultValue="00">
              {HOURS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <select name="dateEndMin" id="dateEndMin" className="form-select ical-time" defaultValue="00">
              {MINUTES.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group row mb-2">
          <label className="col-2 col-form-label ical-form-label">
            <span className="text-success"></span>
          </label>
          <div className="col-10 pt-2">
            <span id="event-repeat-summary"></span>
            <span id="event-repeat-summary-action-empty" style={{ display: 'inline' }}>
              <a href="#" className="show-repeat-dialog" id="show-repeat-dlg-add">Repeats</a>
            </span>
            <span id="event-repeat-summary-action-edit" style={{ display: 'none' }}>
              <a href="#" className="show-repeat-dialog" id="show-repeat-dlg-edit">Edit</a>
              <a href="#" className="remove-repeat" id="show-repeat-dlg-remove">Remove</a>
            </span>
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="description" className="col-2 col-form-label ical-form-label">Description</label>
          <div className="col-10">
            <textarea rows={3} cols={36} className="form-control" id="description" name="description" />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="location" className="col-2 col-form-label ical-form-label">Location</label>
          <div className="col-10">
            <input type="text" className="form-control" id="location" name="location" size={40} />
          </div>
        </div>

        <div className="form-group row mb-2">
          <label htmlFor="inputUrl" className="col-2 col-form-label ical-form-label">URL</label>
          <div className="col-10">
            <input type="text" className="form-control" id="inputUrl" name="inputUrl" size={40} autoCapitalize="off" />
            <small id="emailHelp" className="form-text text-muted">Note: Not all calendars supports URL</small>
          </div>
        </div>
      </form>
    </QrInputCard>
  );
}
