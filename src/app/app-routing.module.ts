import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataParserComponent } from './pages/data-parser/data-parser.component';
import { GUIDGeneratorComponent } from './pages/guidgenerator/guidgenerator.component';
import { HomeComponent } from './pages/home/home.component';
import { LoremIpsumComponent } from './pages/lorem-ipsum/lorem-ipsum.component';
import { MissingPageComponent } from './pages/missing-page/missing-page.component';
import { QRCodesComponent } from './pages/qrcodes/qrcodes.component';
import { StringBuilderComponent } from './pages/string-builder/string-builder.component';
import { StringEncoderComponent } from './pages/string-encoder/string-encoder.component';
import { StringLengthComponent } from './pages/string-length/string-length.component';
import { BootstrapFormGeneratorComponent } from './pages/bootstrap-form-generator/bootstrap-form-generator.component';
import { RelativePathComponent } from './pages/relative-path/relative-path.component';

const routes: Routes = [
  { path: 'data-parser', component: DataParserComponent },
  { path: 'string-length', component: StringLengthComponent },
  { path: 'string-builder', component: StringBuilderComponent },
  { path: 'string-encoder', component: StringEncoderComponent },
  { path: 'lorem-ipsum', component: LoremIpsumComponent },
  { path: 'qr-codes', component: QRCodesComponent },
  { path: 'guid-generator', component: GUIDGeneratorComponent },
  { path: 'bootstrap-forms', component: BootstrapFormGeneratorComponent },
  { path: 'relative-path', component: RelativePathComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: MissingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
