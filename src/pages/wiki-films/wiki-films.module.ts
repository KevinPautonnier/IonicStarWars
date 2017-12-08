import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiFilmsPage } from './wiki-films';

@NgModule({
  declarations: [
    WikiFilmsPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiFilmsPage),
  ],
})
export class WikiFilmsPageModule {}
