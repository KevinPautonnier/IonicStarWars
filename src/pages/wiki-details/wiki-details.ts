import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiModule } from '../wiki/wiki';
import { Modal } from '../../components/modules';

/**
 * Generated class for the WikiDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wiki-details',
  templateUrl: 'wiki-details.html',
})
export class WikiDetailsPage {

	modal;
	navigation = {categorie:"test"};
	api;
	listDetails = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private storage: Storage) {
		this.modal = new Modal(this.loadingCtrl);
		this.modal.showModal();
		this.api = new ApiModule(storage);
		this.storage.get("navigation").then( val => {
			this.navigation = val;
			console.log("WikiDetailsPage constructor navigation:" + JSON.stringify(val));
			this.ionViewDidSet();
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WikiDetailsPage');
	}

	ionViewDidSet() {
		var request = this.navigation["categorie"] + "/" + this.navigation["elementId"];
		console.log("request:" + request);
		this.api.getData( request, response => {
			//console.log(response);
			this.setListe(response)
		});

	}

	setListe (jsonData){
		this.listDetails = [];
		for (var prop in jsonData) {
			var newDetail;
			if( (typeof jsonData[prop]) == "string"){
				newDetail = { title: prop, value : jsonData[prop] };
			}else{
				newDetail = { title: prop, value : JSON.stringify(jsonData[prop]) };
			}
			this.listDetails.push(newDetail);
			//console.log("setDetailList:" +  JSON.stringify(newDetail));
		}
		this.modal.hideModal();

	}
}
