import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(private nativeAudio: NativeAudio, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeAudio.preloadComplex('duel', 'assets/musics/duel.mp3', 1, 1, 0);
  }

  ionViewWillEnter(){
    // Audio launching
    this.nativeAudio.preloadComplex('duel', 'assets/musics/duel.mp3', 1, 1, 0);
    this.nativeAudio.play('duel');
  }

  ionViewWillLeave() {
    this.nativeAudio.stop('duel');
  }

  toassociationForm(){
    window.open("https://docs.google.com/forms/d/1JRrSCy6PBrbSV7stx8VUOpPVwELS_AY8iSUZX4tXXCI/viewform?edit_requested=true", '_system')
  }

}
