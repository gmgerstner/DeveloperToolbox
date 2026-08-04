import { useState } from 'react';

import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';
import './ContactInfoQrInput.css';

export default function ContactInfoQrInput({ onGenerate }: QrInputProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [workPhoneNumber, setWorkPhoneNumber] = useState('');

  const buildVCard = (): string => {
    let value = '';

    value += 'BEGIN:VCARD\r\n';
    value += 'VERSION:4.0\r\n';
    value += `FN:${firstName} ${lastName}\r\n`;
    if (phoneNumber !== '') {
      value += `TEL;TYPE=cell:${phoneNumber}\r\n`;
    }
    if (email !== '') {
      value += `EMAIL:${email}\r\n`;
    }
    if (birthday !== '') {
      value += `BDAY:${birthday.replace('-', '').replace('-', '')}\r\n`;
    }
    if (address !== '') {
      //todo need to parse address
      //value += `ADR;TYPE=home:;;123 Main St.;Springfield;IL;12345;USA\r\n`;
      value += `ADR;TYPE=home:${address}\r\n`;
    }
    if (website !== '') {
      value += `URL:${website}\r\n`;
    }
    if (organization !== '') {
      value += `ORG:${organization}\r\n`;
    }
    if (jobTitle !== '') {
      value += `TITLE:${jobTitle}\r\n`;
    }
    if (workPhoneNumber !== '') {
      value += `TEL;TYPE=work:${workPhoneNumber}\r\n`;
    }

    value += 'END:VCARD';

    return value;
  };

  return (
    <QrInputCard
      title="Contact Information"
      className="contact-qr"
      onGenerate={() => onGenerate(buildVCard())}
    >
      <div className="row">
        <div className="col">
          <label>First Name</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Last Name</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Phone Number</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Email</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Birthday</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          <button className="btn btn-success" type="button" onClick={() => setBirthday('')}>
            Clear
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Address</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Website</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <h5>Organization</h5>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Organization</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Job Title</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Phone Number Work</label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input className="form-control" type="tel" value={workPhoneNumber} onChange={(e) => setWorkPhoneNumber(e.target.value)} />
        </div>
      </div>
    </QrInputCard>
  );
}
