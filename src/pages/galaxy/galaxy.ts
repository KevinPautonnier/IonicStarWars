import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController  } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-galaxy',
  templateUrl: 'galaxy.html',
})
export class GalaxyPage {
  wikiPage = WikiPage;

  // variables pour les info-bulles
  speechs=[
    "Click on the planet/starships to view infos about episodes",
    "Click on the X-Wing to access a list of all datas available",
    "Click on me to get infos about the association!",
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage , private toastCtrl: ToastController) {
    this.bb8speech(this.speechs.length, this.speechs, this);

    storage.ready().then(() => {
      this.storage.get('side').then((val) => {

        if(val == "dark"){
          document.getElementById("me").src = "../../assets/imgs/galaxy/darth-vader.png";
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

  sideToast(text) {
   let toast = this.toastCtrl.create({
     message: text,
     duration: 4000,
     position: 'top',

   });
   toast.present();
 }
}
