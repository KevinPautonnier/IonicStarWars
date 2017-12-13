import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import { GalaxyPage } from '../galaxy/galaxy';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';


@IonicPage()
@Component({
  selector: 'page-sides',
  templateUrl: 'sides.html',
})
export class SidesPage {
    homePage = HomePage;
    galaxyPage = GalaxyPage;


    constructor(private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams , private storage: Storage) {

      this.nativeAudio.preloadComplex('theme', '../../assets/musics/MainTheme.mp3', 0.5, 1, 0);
      nativeAudio.play('theme');

    }

    chooseSide(test){
      this.storage.set('side', test);
      this.storage.get('side').then((val) => {console.log(val)});
      
      this.nativeAudio.stop('theme');

      this.navCtrl.push(GalaxyPage);
    }
}
