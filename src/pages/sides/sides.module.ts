import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SidesPage } from './sides';

@NgModule({
  declarations: [
    SidesPage,
  ],
  imports: [
    IonicPageModule.forChild(SidesPage),
  ],
})
export class SidesPageModule {}
