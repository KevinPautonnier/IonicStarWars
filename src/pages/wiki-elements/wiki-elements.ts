import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';
import { Storage } from '@ionic/storage';
import { WikiDetailsPage } from '../wiki-details/wiki-details';

/**
 * Generated class for the WikiElementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wiki-elements',
  templateUrl: 'wiki-elements.html',
})
export class WikiElementsPage {
	wikiDetail = WikiDetailsPage;
	api = undefined;
	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		this.api = new ApiModule(storage);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WikiElementsPage');
	}

}
