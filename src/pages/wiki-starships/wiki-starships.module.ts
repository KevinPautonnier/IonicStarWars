import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiStarshipsPage } from './wiki-starships';

@NgModule({
  declarations: [
    WikiStarshipsPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiStarshipsPage),
  ],
})
export class WikiStarshipsPageModule {}
