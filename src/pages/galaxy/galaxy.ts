import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController , LoadingController } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { Modal } from '../../components/modules';
import { SettingsPage } from '../settings/settings';

@IonicPage()
@Component({
  selector: 'page-galaxy',
  templateUrl: 'galaxy.html',
})
export class GalaxyPage {
  wikiPage = WikiPage;
  settingsPage = SettingsPage;
  imageSrc = 'assets/imgs/galaxy/X-wing-200.png';
  toast = this.toastCtrl.create({
    message: '',
    duration: 3000,
    position: 'top'
  });

  // Varibles for "info-bulles"
  speechs=[
    "Click on me to get infos about the association!",
    "Click on the X-Wing to access a list of all datas available",
    "Click on the planet/starships to view infos about episodes",
  ];

  constructor(private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams, private storage: Storage , private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.bb8speech(this.speechs.length, this.speechs, this);

    // Test side choosed by user
    this.storage.ready().then(() => {
      this.storage.get('side').then((val) => {
        if(val == "dark"){
          this.imageSrc = "assets/imgs/galaxy/darth-vader.png";
          this.sideToast("Aucune limite à mon pouvoir !");
        }
        else if(val == "light"){
          this.sideToast("La force est très puissante en toi, je le sens !");
        }
        else{
          this.sideToast("Qui êtes vous ? je ne sens pas la force en vous.");
        }
      })
    })
  }

  ionViewWillEnter(){
    // Audio launching
    this.nativeAudio.preloadComplex('ambiance', 'assets/musics/ambiance.mp3', 1, 1, 0);
    this.nativeAudio.loop('ambiance');

    // Test side choosed by user
    this.storage.get('side').then((val) => {
      if(val == "dark"){
        this.imageSrc = 'assets/imgs/galaxy/darth-vader.png';
      }
      else{
        this.imageSrc = 'assets/imgs/galaxy/X-wing-200.png';
      }
    })
  }

    // Launch the assistant BB8
    bb8speech(i, speechs, fun){
      if(i>0){
        setTimeout(function(){
            document.getElementById("speech1").innerHTML=speechs[i-1];
            fun.bb8speech((i-1), speechs, fun);
        }, 4000);
      }
    }

    // Toast adapt for the side choosen
    sideToast(text) {
     this.toast = this.toastCtrl.create({
       message: text,
       duration: 4000,
       position: 'top',
     });
     this.toast.present();
   }

   ionViewWillLeave() {
     this.nativeAudio.stop('ambiance');
     this.toast.dismiss();
   }
}
