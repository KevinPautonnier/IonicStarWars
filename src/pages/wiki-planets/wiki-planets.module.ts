import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiPlanetsPage } from './wiki-planets';

@NgModule({
  declarations: [
    WikiPlanetsPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiPlanetsPage),
  ],
})
export class WikiPlanetsPageModule {}
