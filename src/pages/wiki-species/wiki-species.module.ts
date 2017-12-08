import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiSpeciesPage } from './wiki-species';

@NgModule({
  declarations: [
    WikiSpeciesPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiSpeciesPage),
  ],
})
export class WikiSpeciesPageModule {}
