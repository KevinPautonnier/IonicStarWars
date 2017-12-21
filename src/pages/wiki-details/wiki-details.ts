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
	listDetailsDetails = {};

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
			this.modal.hideModal();
		});
		
	}

	setListe (jsonData){
		this.listDetails = [];
		for (var prop in jsonData) {
			//console.log("props:" + prop);
			this.listDetails.push(this.generateVisual(prop, jsonData[prop]));
		}
		this.modal.hideModal();
	}

	generateVisual(prop, objValue){
		var newDetail
		switch(typeof objValue) {
			case "string":
				newDetail = { title: prop, value : objValue, isList : false, isUrl : false };
				if(objValue.slice(0,4) == "http"){
					newDetail["isUrl"] = true;
				}
				break;

			case "object":
				newDetail = { title: prop, value : objValue, isList : true, isUrl : false };
				this.listDetailsDetails[prop] = [];
				//console.log("object_objValue:" + JSON.stringify(newDetail.value));
				for(var prop2 in objValue){
					//console.log("generateVisualOf:" + this.api.getDataFromUrl(objValue[prop2]).categorie );
					//console.log("generateVisualOf:" + objValue[prop2] );
					var newDetail2 = this.generateVisual(this.api.getDataFromUrl(objValue[prop2]).categorie, objValue[prop2])
					this.listDetailsDetails[prop].push(newDetail2);
					console.log("this.[...].push(" + JSON.stringify(newDetail2));
					//console.log("object_objValue:" + JSON.stringify(newDetail2.value));
				}
				break;

			default:
				newDetail = { title: prop, value : JSON.stringify(objValue) };
		}
		return newDetail;
	}
}
