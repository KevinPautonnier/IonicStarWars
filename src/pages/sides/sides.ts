import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GalaxyPage } from '../galaxy/galaxy';

/**
 * Generated class for the SidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sides',
  templateUrl: 'sides.html',
})
export class SidesPage {
  homePage = HomePage;
  galaxyPage = GalaxyPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SidesPage');
  }

}
