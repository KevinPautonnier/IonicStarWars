import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EpisodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-episode-details',
  templateUrl: 'episode-details.html',
})
export class EpisodeDetailsPage {

  api = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.api = new ApiModule(storage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EpisodeDetailsPage');
    this.getCharacter();
  }

  getCharacter(){
    this.api.getData("films/4/", response =>{document.getElementById("requestData").innerHTML = JSON.stringify(response)});
  }
}
