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
	categorie;
	page;
	nbElemPerPage;
	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		this.api = new ApiModule(storage);
		storage.get("navigation").then( val => {
			this.categorie = val.categorie;
			this.page = val.page;
			this.nbElemPerPage = val.nbElemPerPage;
			this.ionViewDidSet();
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WikiElementsPage');
	}

	ionViewDidSet() {
		console.log('ionViewDidSet WikiElementsPage');
		console.log("categorie:" + this.categorie);
		console.log("page:" + this.page);
		console.log("nbElemPerPage:" + this.nbElemPerPage);

		this.api.getData(this.categorie + "/" + (this.nbElemPerPage*(this.page-1) + 1) + "-" + (this.nbElemPerPage*(this.page-1) + this.nbElemPerPage), response => {console.log(response)});
	}

}
