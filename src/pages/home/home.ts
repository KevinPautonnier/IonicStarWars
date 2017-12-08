import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';
import { GalaxyPage } from '../galaxy/galaxy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  wikiPage = WikiPage;
  galaxyPage = GalaxyPage;

  constructor(public navCtrl: NavController) {

  }

}
