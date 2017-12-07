import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  wikiPage = WikiPage;

  constructor(public navCtrl: NavController) {

  }

}
