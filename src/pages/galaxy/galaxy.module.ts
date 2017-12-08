import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalaxyPage } from './galaxy';

@NgModule({
  declarations: [
    GalaxyPage,
  ],
  imports: [
    IonicPageModule.forChild(GalaxyPage),
  ],
})
export class GalaxyPageModule {}
