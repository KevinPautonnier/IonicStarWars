import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiDetailsPage } from './wiki-details';

@NgModule({
  declarations: [
    WikiDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiDetailsPage),
  ],
})
export class WikiDetailsPageModule {}
