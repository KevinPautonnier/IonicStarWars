import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { GalaxyPage } from '../galaxy/galaxy';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';


@IonicPage()
@Component({
  selector: 'page-sides',
  templateUrl: 'sides.html',
})
export class SidesPage {
    galaxyPage = GalaxyPage;


    constructor(private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams , private storage: Storage) {
      
      this.nativeAudio.preloadComplex('theme', 'assets/musics/ImperialMarch.mp3', 1, 1, 0);

    }

    //Store the side choose by the user
    chooseSide(test){
      //stop audio before changing page
      console.log(test);

      if(test != undefined){
        this.storage.set('side', test).then((val) => {
          this.nativeAudio.stop('theme');
          this.navCtrl.push(GalaxyPage);
        });
      }
      this.storage.set('firstTime', false);
      this.nativeAudio.stop('theme');
    }

    ionViewWillEnter(){
      this.nativeAudio.preloadComplex('theme', 'assets/musics/ImperialMarch.mp3', 1, 1, 0);
      this.nativeAudio.play('theme');
    }

    ionViewWillLeave() {
      this.nativeAudio.stop('theme');
    }
}
