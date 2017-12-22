import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import { SidesPage } from '../sides/sides';
import { AboutPage } from '../about/about';
import { Modal } from '../../components/modules';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  sidesPage = SidesPage;
  aboutPage = AboutPage;

  modal = undefined;

  constructor(private storage: Storage ,private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    storage.ready().then(() => {
      this.storage.get('side').then((val) => {
        if(val == "dark"){
            //document.getElementById('btn1').setAttribute('color','danger');
        }
      })
    })
    this.modal = new Modal(this.loadingCtrl);
  }

  resetData(){
    this.modal.showModal();
    this.storage.set("data", {categories : ["films","people","vehicles","starships","species","planets"]}).
    then(data => {
      console.log("Data Reset");
      this.modal.hideModal();
    });
  }
}
