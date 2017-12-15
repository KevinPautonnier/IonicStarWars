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
			console.log("obj." + prop +" = " + jsonData[prop].name);
			newContainerContent += '<div [navPush]="wikiDetail" class="element">';
			newContainerContent += '<div class="image">img</div>';
			newContainerContent += '<div class="name">' + jsonData[prop].name + '</div>';
			newContainerContent += '</div>';
		}

		document.getElementById("container").innerHTML = newContainerContent;
	}
}
