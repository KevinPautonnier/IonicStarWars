import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WikiDetailsPage } from '../wiki-details/wiki-details';

/**
 * Generated class for the WikiSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-wiki-search',
	templateUrl: 'wiki-search.html',
})
export class WikiSearchPage {
	pageData = [] ;
	searchData;
	navigation;
	listCategories;
	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		this.storage.get("listCategories").then( val => {
			this.listCategories = val;

			this.storage.get("navigation").then( val => {
				this.navigation = val;

				this.storage.get("searchData").then( val => {
					this.searchData = val;
					//console.log("WikiSearchPage constructor navigation:" + JSON.stringify(val));
					this.ionViewDidSet();
				});
			});
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WikiSearchPage');
	}

	ionViewDidSet(){
		
		var tmpPageData = []
		for(var categorieName in this.searchData.categories){
			var tmpCategorie = [];

			for(var p in this.searchData.categories[categorieName]){
				var tmpElement = this.searchData.categories[categorieName][p];
				tmpElement["categorie"] = categorieName;
				tmpCategorie.push(tmpElement);
			}
			tmpPageData.push(tmpCategorie);
		}
		this.pageData = tmpPageData;
		console.log("WikiSearchPage_ionViewDidSet_pageData:");
		console.log(this.pageData);
	}

	goToDetails(categorie, elementId) {
		console.log('redirectTo:' +categorie + "/" + elementId);
		this.navigation["elementId"] = elementId;
		this.navigation["categorie"] = categorie;
		this.storage.set("navigation", this.navigation).then(navigation => {
			this.navCtrl.push(WikiDetailsPage);
		})
	}

	formatTitle(title){
		return title.charAt(0).toUpperCase() + title.slice(1)
	};

	getCategorieParametre(categorie){
		for(var p in this.listCategories){
			if(this.listCategories[p].categorie == categorie){
				return this.listCategories[p];
			}
		}
	}
}
