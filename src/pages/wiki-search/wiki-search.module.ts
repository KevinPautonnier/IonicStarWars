import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiSearchPage } from './wiki-search';

@NgModule({
  declarations: [
    WikiSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiSearchPage),
  ],
})
export class WikiSearchPageModule {}
