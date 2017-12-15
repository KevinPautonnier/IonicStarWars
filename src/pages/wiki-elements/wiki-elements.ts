import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';
import { Storage } from '@ionic/storage';
import { WikiDetailsPage } from '../wiki-details/wiki-details';
import { Modal } from '../../app/app.component';

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
	listElements = [];
	modal;
	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private storage: Storage) {
		this.modal = new Modal(this.loadingCtrl);
		this.modal.showModal();
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
/*		
		console.log("categorie:" + this.categorie);
		console.log("page:" + this.page);
		console.log("nbElemPerPage:" + this.nbElemPerPage);
*/
		var nbPreviousElements = this.nbElemPerPage*(this.page-1);
		this.api.getData(this.categorie + "/" + ( nbPreviousElements + 1 ) + "-" + ( nbPreviousElements + this.nbElemPerPage ), response => {console.log(response); this.setListe(response)});
	}

	setListe (jsonData){
		var newContainerContent = "";
		for (var prop in jsonData) {
			jsonData[prop]["elementId"] = prop;
			this.listElements.push(jsonData[prop]);
		}
		this.modal.hideModal();
	}

	goToDetails(elementId) {
		console.log('redirectTo:' + this.categorie + "/" + elementId);
		this.navCtrl.push(WikiDetailsPage);
	}
}
