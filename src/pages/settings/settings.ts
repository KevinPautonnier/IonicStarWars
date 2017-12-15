import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import { SidesPage } from '../sides/sides';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  sidesPage = SidesPage;
  aboutPage = AboutPage;

  constructor(private storage: Storage ,private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams) {
    storage.ready().then(() => {
      //change theme depending on the side choosen
      this.storage.get('side').then((val) => {
        if(val == "dark"){
            //document.getElementById('btn1').setAttribute('color','danger');
        }
      })
    })
  }
}
