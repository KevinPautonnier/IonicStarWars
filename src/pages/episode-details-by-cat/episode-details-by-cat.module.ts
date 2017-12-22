import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EpisodeDetailsByCatPage } from './episode-details-by-cat';

@NgModule({
  declarations: [
    EpisodeDetailsByCatPage,
  ],
  imports: [
    IonicPageModule.forChild(EpisodeDetailsByCatPage),
  ],
})
export class EpisodeDetailsByCatPageModule {}
