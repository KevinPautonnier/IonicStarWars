import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the Movie8Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie8',
  templateUrl: 'movie8.html',
})
export class Movie8Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer) {
    youtube.openVideo('feQoOTF-_pA');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Movie8Page');
  }

}
