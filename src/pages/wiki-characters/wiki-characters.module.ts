import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiCharactersPage } from './wiki-characters';

@NgModule({
  declarations: [
    WikiCharactersPage,
  ],
  imports: [
    IonicPageModule.forChild(WikiCharactersPage),
  ],
})
export class WikiCharactersPageModule {}
