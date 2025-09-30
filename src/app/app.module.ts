import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { StringLengthComponent } from './pages/string-length/string-length.component';
import { DataParserComponent } from './pages/data-parser/data-parser.component';
import { HomeComponent } from './pages/home/home.component';
import { StringBuilderComponent } from './pages/string-builder/string-builder.component';
import { StringEncoderComponent } from './pages/string-encoder/string-encoder.component';
import { LoremIpsumComponent } from './pages/lorem-ipsum/lorem-ipsum.component';
import { QRCodesComponent } from './pages/qrcodes/qrcodes.component';
import { GUIDGeneratorComponent } from './pages/guidgenerator/guidgenerator.component';
import { MissingPageComponent } from './pages/missing-page/missing-page.component';
import { SettingsBoxComponent } from './pages/data-parser/settings-box/settings-box.component';
import { OutputBoxComponent } from './pages/data-parser/output-box/output-box.component';
import { InputBoxComponent } from './pages/data-parser/input-box/input-box.component';
import { UrlQrInputComponent } from './pages/qrcodes/url-qr-input/url-qr-input.component';
import { TextQrInputComponent } from './pages/qrcodes/text-qr-input/text-qr-input.component';
import { EmailQrInputComponent } from './pages/qrcodes/email-qr-input/email-qr-input.component';
import { PhoneQrInputComponent } from './pages/qrcodes/phone-qr-input/phone-qr-input.component';
import { ContactInfoQrInputComponent } from './pages/qrcodes/contact-info-qr-input/contact-info-qr-input.component';
import { SmsQrInputComponent } from './pages/qrcodes/sms-qr-input/sms-qr-input.component';
import { MapQrInputComponent } from './pages/qrcodes/map-qr-input/map-qr-input.component';
import { CalendarQrInputComponent } from './pages/qrcodes/calendar-qr-input/calendar-qr-input.component';
import { WiFiQrInputComponent } from './pages/qrcodes/wi-fi-qr-input/wi-fi-qr-input.component';
import { BaseQrInputComponent } from './pages/qrcodes/base-qr-input/base-qr-input.component';
import { BootstrapFormGeneratorComponent } from './pages/bootstrap-form-generator/bootstrap-form-generator.component';
import { RelativePathComponent } from './pages/relative-path/relative-path.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    StringLengthComponent,
    DataParserComponent,
    HomeComponent,
    StringBuilderComponent,
    StringEncoderComponent,
    LoremIpsumComponent,
    QRCodesComponent,
    GUIDGeneratorComponent,
    MissingPageComponent,
    SettingsBoxComponent,
    OutputBoxComponent,
    InputBoxComponent,
    UrlQrInputComponent,
    TextQrInputComponent,
    EmailQrInputComponent,
    PhoneQrInputComponent,
    ContactInfoQrInputComponent,
    SmsQrInputComponent,
    MapQrInputComponent,
    CalendarQrInputComponent,
    WiFiQrInputComponent,
    BaseQrInputComponent,
    BootstrapFormGeneratorComponent,
    RelativePathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
