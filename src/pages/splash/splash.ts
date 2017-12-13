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

    this.nativeAudio.preloadComplex('saber', '../../assets/musics/LightSaber.mp3', 1, 1, 0);
    nativeAudio.play('saber');
    
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.nativeAudio.stop('saber');
      this.navCtrl.push(SidesPage);
    }, 4000);
    this.splashScreen.hide();
  }

}
