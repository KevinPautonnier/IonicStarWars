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
	title;
	get getTitle(){return this.title}
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
		console.log("ionViewDidSet_request:" + request);
		this.api.getData( request, response => {
			//console.log(response);
			if(response != "404"){
				this.title = response[response.principaleAttributeName];
				this.setListe(response)
			}else{
				this.title = "No Data";
			}
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
					this.api.getData(objValue, response => {
						if(response != "404"){
							for(var obj in this.listDetails){
								if(this.listDetails[obj].value == objValue){
									this.listDetails[obj].urlTitle = response[response.principaleAttributeName];
									console.log("link( " + response[response.principaleAttributeName] + "):" + objValue);
									break;
								}
							}
						}else{
							this.listDetailsDetails[prop][obj].urlTitle = "No Data"
							this.listDetails[prop][obj].objValue = "";
						}
					});
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
					newDetail2["url"] = objValue[prop2];
					this.setUrlTitle(objValue[prop2], prop);
					this.listDetailsDetails[prop].push(newDetail2);
					//console.log("this.[...].push(" + JSON.stringify(newDetail2));
					//console.log("object_objValue:" + JSON.stringify(newDetail2.value));
				}
				break;

			default:
				newDetail = { title: prop, value : JSON.stringify(objValue) };
		}
		return newDetail;
	}

	redirectTo(url){
		if(url.length > 0){	
			this.modal.showModal();
			console.log("redirectTo:" + url);
			this.navigation["categorie"] = this.api.getDataFromUrl(url).categorie;
			this.navigation["elementId"] = this.api.getDataFromUrl(url).elementId;
			this.storage.set("navigation", this.navigation).then(navigation => {this.ionViewDidSet();});	
		}	
	}

	setUrlTitle(url, title){
		console.log("setUrlTitle(" + url + ", " + title +" )");
		this.api.getData(url, response => {
			if(response != "404"){
				for(var obj in this.listDetailsDetails[title]){
					if(this.listDetailsDetails[title][obj].url == url){
						this.listDetailsDetails[title][obj].urlTitle = response[response.principaleAttributeName];
						break;
					}
				}
			}else{
				this.listDetailsDetails[title][obj].urlTitle = "No Data";
				this.listDetailsDetails[title][obj].url = "";
			}
		});
	}
}
