import { Component, NgModule} from '@angular/core';
import { Platform, LoadingController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Splash } from '../pages/splash/splash';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Splash;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
    });
  }
}
