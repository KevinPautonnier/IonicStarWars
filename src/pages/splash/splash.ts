import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SidesPage } from '../sides/sides';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})

export class Splash {
  constructor(private nativeAudio: NativeAudio, public viewCtrl: ViewController, public splashScreen: SplashScreen, public navCtrl: NavController) {

    // audio run
    this.nativeAudio.preloadComplex('saber', 'assets/musics/LightSaber.mp3', 1, 1, 3);

    }

    ionViewDidLoad() {
        this.nativeAudio.play('saber');
    }

    ionViewDidEnter() {
      setTimeout(() => {
        this.navCtrl.push(SidesPage);
        this.nativeAudio.stop('saber');
      }, 4000);
    }

}
