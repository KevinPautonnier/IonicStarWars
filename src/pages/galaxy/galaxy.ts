import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bb8speech(this.speechs.length, this.speechs, this);
  };
  
  bb8speech(i, speechs, fun){
    if(i>0){
      setTimeout(function(){
          console.log(i);
          document.getElementById("speech1").innerHTML=speechs[i-1];
          console.log(speechs[i-1]);
          fun.bb8speech((i-1), speechs, fun);
      }, 2000);
    }
  };
}
