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


@NgModule({
  imports:      [],
  declarations: []
})

 export class Modal{
    loading;

   constructor(public loadingCtrl: LoadingController) {
   }

   showModal(time){
     if(time<=0){
       this.loading = this.loadingCtrl.create({
       spinner: 'hide',
       content: `<div class="loader">
       <div class="droid">
      <div class="head">
      <span></span>
      <span></span>
      <span></span>
      <span class="eye"></span>
      <span class="small-eye"></span>
      </div>
      <div class="wheel">
      <span></span>
      <span></span>
      <span></span>
      </div>
      </div>
      <h1>LOADING.... PLEASE WAIT</h1>

      </div>`
      });
     }
     else{
       this.loading = this.loadingCtrl.create({
       spinner: 'hide',
       content: `<div class="loader">
       <div class="droid">
    <div class="head">
      <span></span>
      <span></span>
      <span></span>
      <span class="eye"></span>
      <span class="small-eye"></span>
    </div>
    <div class="wheel">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <h1>LOADING.... PLEASE WAIT</h1>

  </div>`,
  duration: time*1000
     });
     }
   this.loading.present();
   }

   hideModal(){
      this.loading.dismiss();
   }

 }
