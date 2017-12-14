import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';
import { Storage } from '@ionic/storage';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.api = new ApiModule(storage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WikiCharactersPage');
  }

  getCharacter(){
  	this.api.getData("people/12/", response =>{document.getElementById("requestData").innerHTML = JSON.stringify(response)});
  }

}
