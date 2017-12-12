import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import { GalaxyPage } from '../galaxy/galaxy';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-sides',
  templateUrl: 'sides.html',
})
export class SidesPage {
    homePage = HomePage;
    galaxyPage = GalaxyPage;

    constructor(public navCtrl: NavController, public navParams: NavParams , private storage: Storage) {}

    chooseSide(test){
      this.storage.set('side', test);
      this.storage.get('side').then((val) => {console.log(val)});
      this.navCtrl.push(GalaxyPage);
    }
}
