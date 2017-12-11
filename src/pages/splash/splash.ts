import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SidesPage } from '../sides/sides';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})

export class Splash {
  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen, public navCtrl: NavController) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.navCtrl.push(SidesPage);
    }, 4000);
    this.splashScreen.hide();
  }

}
