import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WikiPage } from '../wiki/wiki';
import { GalaxyPage } from '../galaxy/galaxy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  wikiPage = WikiPage;
  galaxyPage = GalaxyPage;
  speechs=[
    "Click on the planet/starships to view infos about episodes",
    "Click on the X-Wing to access a list of all datas available",
    "Click on me to get infos about the association!",
  ];

  constructor(public navCtrl: NavController) {
    this.bb8speech(this.speechs.length, this.speechs, this);
  };

  bb8speech(i, speechs, fun){
    if(i>0){
      setTimeout(function(){
          console.log(i);
          document.getElementById("speech").innerHTML=speechs[i-1];
          fun.bb8speech((i-1), speechs, fun);
      }, 2000);
    }
  };
}
