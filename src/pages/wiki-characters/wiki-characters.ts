import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';
import { Storage } from '@ionic/storage';
import {Modal} from '../../app/app.component';

/**
 * Generated class for the WikiCharactersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wiki-characters',
  templateUrl: 'wiki-characters.html',
})
export class WikiCharactersPage {
  api = undefined;
  modal = undefined;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl:LoadingController) {
    this.api = new ApiModule(storage);
    this.modal = new Modal(loadingCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WikiCharactersPage');
  }

  getCharacter(){
    this.modal.showModal(0);
  	this.api.getData("people/12/", response =>{document.getElementById("requestData").innerHTML = JSON.stringify(response);this.modal.hideModal()});
  }
}
