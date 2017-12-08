import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiVehiculesPage } from './wiki-vehicules';

@NgModule({
  declarations: [
    WikiVehiculesPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiVehiculesPage),
  ],
})
export class WikiVehiculesPageModule {}
