import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiModule } from '../wiki/wiki';
import { Storage } from '@ionic/storage';
import { WikiDetailsPage } from '../wiki-details/wiki-details';
import { Modal } from '../../components/modules';

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
	listElements = [];
	modal;
	navigation={categorie:"test"};

	get getcategorie(){return this.navigation.categorie.charAt(0).toUpperCase() + this.navigation.categorie.slice(1)};



	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private storage: Storage) {
		this.modal = new Modal(this.loadingCtrl);
		this.modal.showModal();
		this.api = new ApiModule(storage);
		storage.get("navigation").then( val => {
			this.navigation = val;
			this.ionViewDidSet();
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WikiElementsPage');
	}

	ionViewDidSet() {
		console.log('ionViewDidSet WikiElementsPage');

		var nbPreviousElements = (this.navigation["nbElemPerPage"])*(this.navigation["page"]-1);
		var request = this.navigation.categorie + "/" + ( nbPreviousElements + 1 ) + "-" + ( nbPreviousElements + this.navigation["nbElemPerPage"] );
		//console.log("request:" + request);
		this.api.getData( request, response => {
			//console.log(response);
			this.setListe(response)
		});
	}

	setListe (jsonData){
		this.listElements = [];

		for (var prop in jsonData) {
			jsonData[prop]["elementId"] = prop;


			var img_filler = "";
			if(this.navigation.categorie == "people"){
				img_filler= "assets/imgs/wiki/characters/" + this.prepare(jsonData[prop]["name"]) +".png";
			}else if( this.navigation.categorie == "planets"){
				img_filler= "assets/imgs/wiki/planets/" + this.prepare(jsonData[prop]["name"])+".png";
			}else{
				img_filler = "unknown.png";
			}

			jsonData[prop]["img"]=  encodeURI(img_filler);
			//console.log(this.navigation.categorie);
			this.listElements.push(jsonData[prop]);
		}
		this.modal.hideModal();
	}

	prepare(string){
		return string.replace(/\s/g, "").toLocaleLowerCase();
	}

	goToDetails(elementId) {
		console.log('redirectTo:' + this.navigation.categorie + "/" + elementId);
		this.navigation["elementId"] = elementId;
		this.storage.set("navigation", this.navigation).then(navigation => {
			this.navCtrl.push(WikiDetailsPage);
		})
	}
}
