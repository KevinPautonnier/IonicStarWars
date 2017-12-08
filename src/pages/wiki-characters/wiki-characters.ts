import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WikiCharactersPage');
  }

  getCharacter(){
  	new ApiModule().getFromApi("people/1/");
  }

}
