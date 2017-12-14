import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController  } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';
import {EpisodeDetailsPage} from "../episode-details/episode-details";

@IonicPage()
@Component({
  selector: 'page-galaxy',
  templateUrl: 'galaxy.html',
})
export class GalaxyPage {
  wikiPage = WikiPage;
  settingsPage = SettingsPage;

  nav = undefined;

  // Varibles for "info-bulles"
  speechs=[
    "Click on the planet/starships to view infos about episodes",
    "Click on the X-Wing to access a list of all datas available",
    "Click on me to get infos about the association!",
  ];

  constructor(private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams, private storage: Storage , private toastCtrl: ToastController, nav: NavController) {
    this.bb8speech(this.speechs.length, this.speechs, this);

    this.nav = nav;

    // Audio launching
    this.nativeAudio.preloadComplex('ambiance', 'assets/musics/ambiance.mp3', 1, 1, 0);
    nativeAudio.loop('ambiance');

    // Test side choosed by user
    storage.ready().then(() => {
      this.storage.get('side').then((val) => {

        if(val == "dark"){
          (<HTMLImageElement>document.getElementById("me")).src = "assets/imgs/galaxy/darth-vader.png";
          this.sideToast("Aucune limite à mon pouvoir !");
          console.log(val);
        }
        else if(val == "light"){
          this.sideToast("La force est très puissante en toi, je le sens !");
          console.log(val);
        }
        else{
          this.sideToast("Qui êtes vous ? je ne sens pas la force en vous.");
        }
      })
    })
  }


  toFilmDetailsPage (){this.nav.push(EpisodeDetailsPage);};

    // Launch the assistant BB8
    bb8speech(i, speechs, fun){
      if(i>0){
        setTimeout(function(){
            console.log(i);
            document.getElementById("speech1").innerHTML=speechs[i-1];
            console.log(speechs[i-1]);
            fun.bb8speech((i-1), speechs, fun);
        }, 2000);
      }
    }

    // Toast adapt for the side choosen
    sideToast(text) {
     let toast = this.toastCtrl.create({
       message: text,
       duration: 4000,
       position: 'top',

     });
     toast.present();
   }
}
