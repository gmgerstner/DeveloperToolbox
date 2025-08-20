import { Component, OnInit } from '@angular/core';
import { BaseQrInputComponent } from '../base-qr-input/base-qr-input.component';

@Component({
  selector: 'app-wi-fi-qr-input',
  templateUrl: './wi-fi-qr-input.component.html',
  styleUrls: ['./wi-fi-qr-input.component.css']
})
export class WiFiQrInputComponent extends BaseQrInputComponent {
  T: string = "nopass";
  S: string = "";
  H: boolean = false;
  P: string = "";

  private getRaw(): string {
    let raw: string = "WIFI:";
    raw += `T:${this.T};`;
    raw += `S:${this.S};`;
    raw += `H:${this.H};`;
    raw += `P:${this.P};`;
    return raw;
  }

  override get content(): string {
    return this.getRaw();
  }

  /*
      eg, 'WIFI:T:WPA;S:mynetwork;P:mypass;;'

        Parameter	  Example	  Description
        T	          WPA	      Authentication type; can be WEP or WPA or WPA2-EAP, or nopass for no password. Or, omit for no password.
        S	          mynetwork	  Network SSID. Required. Enclose in double quotes if it is an ASCII name, but could be interpreted as hex (i.e. "ABCD")
        P	          mypass	  Password, ignored if T is nopass (in which case it may be omitted). Enclose in double quotes if it is an ASCII name, but could be interpreted as hex (i.e. "ABCD")
        H	          true	      Optional. True if the network SSID is hidden. Note this was mistakenly also used to specify phase 2 method in releases up to 4.7.8 / Barcode Scanner 3.4.0. If not a boolean, it will be interpreted as phase 2 method (see below) for backwards-compatibility
        E	          TTLS	      (WPA2-EAP only) EAP method, like TTLS or PWD
        A	          anon	      (WPA2-EAP only) Anonymous identity
        I	          myidentity  (WPA2-EAP only) Identity
        PH2	          MSCHAPV2	  (WPA2-EAP only) Phase 2 method, like MSCHAPV2
*/
}
//https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
