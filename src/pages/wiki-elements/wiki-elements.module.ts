import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiElementsPage } from './wiki-elements';

@NgModule({
  declarations: [
    WikiElementsPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiElementsPage),
  ],
})
export class WikiElementsPageModule {}
