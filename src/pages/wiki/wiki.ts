import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { WikiFilmsPage } from '../wiki-films/wiki-films';
import { WikiSpeciesPage } from '../wiki-species/wiki-species';
import { WikiCharactersPage } from '../wiki-characters/wiki-characters';
import { WikiVehiculesPage } from '../wiki-vehicules/wiki-vehicules';
import { WikiStarshipsPage } from '../wiki-starships/wiki-starships';
import { WikiPlanetsPage } from '../wiki-planets/wiki-planets';
import { WikiElementsPage } from '../wiki-elements/wiki-elements';
import { Storage } from '@ionic/storage';
import { Modal } from '../../components/modules';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-wiki',
  templateUrl: 'wiki.html'
})

export class WikiPage {
	listCategories = [
		{categorie:"films",title:"Films",imgUrl:"assets/imgs/films.jpeg"},
		{categorie:"species",title:"Species",imgUrl:"assets/imgs/species.jpg"},
		{categorie:"people",title:"Characters",imgUrl:"assets/imgs/personnages.jpg"},
		{categorie:"vehicles",title:"Vehicles",imgUrl:"assets/imgs/vehicules.jpg"},
		{categorie:"starships",title:"Starships",imgUrl:"assets/imgs/starships.jpeg"},
		{categorie:"planets",title:"Planets",imgUrl:"assets/imgs/planets.jpg"},
	]
	navigation = {categorie : undefined, films : undefined, page:1, nbElemPerPage:300, elementId: undefined};
	api;

	constructor(public nav: NavController, private loadingCtrl: LoadingController, private storage: Storage, public alertCtrl: AlertController) {
		this.api = new ApiModule(storage)
		this.storage.set("navigation", this.navigation);
		this.storage.set("listCategories", this.listCategories);
	};

	toElementListe(categorie) {
		console.log("toElementListe:" + categorie);
		this.navigation["categorie"] = categorie;
		this.storage.set("navigation", this.navigation).then(navigation => {this.nav.push(WikiElementsPage)});		
	}
	search(value){
		this.api.search(value);
	}
	searchInCategorie(categorie, value){
		this.api.searchInCategorie(categorie, value);
	}

	showPrompt() {
		let prompt = this.alertCtrl.create({
			title: 'Search',
			message: "Enter name/title or a part of it",
			inputs: [
				{
					name: 'value',
					placeholder: 'Name / Title'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Search',
					handler: data => {
						console.log('Search clicked:' + data.value);
						this.search(data.value);
					}
				}
			]
		});
		prompt.present();
	}
}





import { NgModule }  from '@angular/core';

var tmp= {};
var wikiStorage;
var apiRequestUrl = "https://swapi.co/api/";
var navigation;
var data = {
	categories : ["films","people","vehicules","starships","species","planets"],
	principaleTuileAttribute:{
		"films" : "titre",
		"people" : "name",
		"vehicules":"name",
		"starships":"name",
		"species":"name",
		"planets" :"name"}
};
// {films:{count:70, data:{1:{}, ...}, ...}, ...}

function getData2step ( urlComplement, callback ){
	var url = urlComplement.split("/");
	//console.log("2ndStep:" + url[1]);
	var categorieName = url[0];
	var elementNumber = url[1];
	if(elementNumber == ""){
		fillCategorie(categorieName, callback);
	}else{
		if(elementNumber.includes("-")){
			// *** Multiple element à charger ***
			var zone = elementNumber.split("-");
			if( Number(zone[0]) < 1 ){zone[0] = 1}
			if( Number(zone[1]) > data[categorieName].count){zone[1] = data[categorieName].count}
			var delta = Number(zone[1]) - Number(zone[0]);
			if(delta < 2){
				// *** Le mec il a pas compris --' ***
				var newCallback = response => {
					var container = {};
					container[zone[0]] = response;
					callback(container);
				}
				requestApi(categorieName + "/" +  zone[0] + "/", newCallback);
			}else{
				var firstId = Number(zone[0]);
				var LastId = Number(zone[1]);
				tmp["firstId"] = Number(zone[0]);
				tmp["LastId"] = Number(zone[1]);
				tmp[categorieName] = {};
				tmp[categorieName]["nbSend"] = 0;
				while(firstId <= tmp["LastId"]){
					if(data[categorieName].data[firstId] == undefined ){
						tmp[categorieName]["nbSend"] = tmp[categorieName]["nbSend"] + 1;
						requestApi(categorieName + "/" +  firstId + "/", function(elementsId, categorie, callback, response) {
							tmp[categorieName]["nbSend"] = tmp[categorieName]["nbSend"] -1;
							//console.log("idAjout:" + (firstId + p));
							if(response["__zone_symbol__currentTask"] == undefined){
								data[categorie].data[elementsId] = response;
							}else{
								data[categorie].data[elementsId] = "404";
							}
							if(tmp[categorieName]["nbSend"] == 0){
								// *** La dernière requête est de retour ***
								callback(concatData(categorie,Number(tmp["firstId"]), Number(tmp["LastId"])));
							}
						}.bind(null, firstId, categorieName, callback));
					}
					firstId = firstId + 1;
				}
				if(tmp[categorieName]["nbSend"] == 0){
					// *** Aucune requête n'a été effectué ***
					callback(concatData(categorieName, Number(zone[0]), LastId));
				}
			}
		}else{
			// *** Element unique ***
			if(data[categorieName] == undefined){
				console.log("getData2step_data[categorieName]:" + categorieName);
			}
			if(data[categorieName].data[elementNumber] == undefined || data[categorieName].data[elementNumber] == "404") {
				// *** si l'élément demandé n'a pas encore été requeté. ***
				requestApi(urlComplement, response => {
					if(response["__zone_symbol__currentTask"] == undefined){
						data[categorieName].data[elementNumber] = response;
						callback(response);
					}else{
						data[categorieName].data[elementNumber] = "404";
						callback("404");
					}
				});
			}else {
				callback(data[categorieName].data[elementNumber]);
			}
		}
	}
}

function concatData(categorie, firstId, LastId){
	var newResponse = {};
	for (var p = 0; p <= (LastId-firstId); p++){
		if(data[categorie].data[firstId + p] != undefined && data[categorie].data[firstId + p] != "404"){
			newResponse[p+firstId] = data[categorie].data[firstId + p];
		}
	}
	return newResponse;
}

function requestApi( urlComplement, callback ){

	var requestUrl = apiRequestUrl + formatUrl(urlComplement);
	console.log("RequestApi:" + requestUrl);

	fetch(new Request(requestUrl))
	.then(response => {
		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error('Something went wrong on api server!');
		}
	})
	.then(response => {

			//console.log("response.json:" + JSON.stringify(response));
			response["principaleAttributeName"] = getPrincipaleAttributeName(urlComplement.split("/")[0]);
			callback(response);
		}).catch(error => {
			console.error(error);
			callback(error);
	});
}

function _callbackInitCategorie( urlComplement, callback, response ){
	var newCategorie = {
		count : response.count,
		data : {}
	}
	data[urlComplement.split("/")[0]] = newCategorie;
	getData2step(urlComplement, callback);
}

function fillCategorie(categorie, callback) {
	console.log("fillCategorie:"+categorie);
	var i = 1;
	tmp[categorie] = {};
	tmp[categorie]["nbSend"] = 0;
	while(i <= data[categorie].count ){
		tmp[categorie]["nbSend"] = tmp[categorie]["nbSend"] +1;
		if(data[categorie].data[i] == undefined ){
			requestApi(categorie + "/" + i + "/", _callbackSaveDataElement.bind(null, categorie, i, callback, true));
		}else{
			_callbackSaveDataElement( categorie, i, callback, i == data[categorie].count, data[categorie].data[i]);
		}
		i++
	}
	//console.log("data=" + data);
}

function _callbackSaveDataElement( categorie, elementId, callback, isAsync, response ) {
	//console.log("_callbackSaveDataElement:"+categorie + "-" + elementId + "-nbSend:" + tmp[categorie]["nbSend"]);
	tmp[categorie]["nbSend"] = tmp[categorie]["nbSend"] -1;

	if(response["__zone_symbol__currentTask"] == undefined){

		data[categorie].data[elementId] = response;
		if(tmp[categorie]["nbSend"] < 1 && isAsync){
			callback(data[categorie].data);
		}

	}else{
		//console.log("new404");
		data[categorie].data[elementId] = "404";
	}

}

function formatUrl(url){
	var url2 = "" + url;
	//console.log("lastChar:" + url2.charAt(url2.length - 1));
	if(url2.charAt(url2.length - 1) !=  '/') {
		url2 = url2 + "/";
	}
	if(url2.length > apiRequestUrl.length && url2.slice(0,apiRequestUrl.length) == apiRequestUrl ){
		return url2.slice(apiRequestUrl.length, url2.length-1);
	}else{
		return url2;
	}
}

function getPrincipaleAttributeName(categorieName){
	if(categorieName == "films"){
		return "title";
	}else{
		return "name";
	}
}

function getData05(urlComplement, callback ){
	var newCallback = function(response ){ wikiStorage.set("data",data); callback(response) };
	
	var formatedUrlComplement = formatUrl(urlComplement);
	
	var url = formatedUrlComplement.split("/");
	if( data[url[0]] == undefined && data.categories.indexOf(url[0]) > -1 ){
		// *** Si première demande d'une catégorie ***
		console.log("newCategorie:" + url[0]);
		requestApi(url[0]+"/", _callbackInitCategorie.bind(null, formatedUrlComplement, newCallback) );

	}else{
		// *** Si la catégorie à déjà été demandé ***
		//console.log("knewCategorie:" + url[0]);
		getData2step( formatedUrlComplement, newCallback );
	}
}

@NgModule({
  imports:      [ ],
  declarations: [ ]
})

export class ApiModule {

	constructor( private storage: Storage ){
		wikiStorage = storage;
		wikiStorage.get("data").then(val => {
			if(val == undefined) {
				wikiStorage.set("data", {categories : ["films","people","vehicles","starships","species","planets"]});
			}else {
				data = val;
			}
		})
	}

	getData( urlComplement, callback ) {
		//console.log("getData_data=" + JSON.stringify(data));
		// *** Préparation de la sauvegarde dans storage ***
		//debugger;
		wikiStorage.get("data").then(storageData =>{ data = storageData; })
		wikiStorage.get("navigation").then(storageNavigationData =>{ navigation = storageNavigationData; getData05(urlComplement, callback )})
	}

	getDataFromUrl(url){
		var urlObject = {
			categorie : url.split("/")[4],
			elementId : url.split("/")[5]
		}
		return urlObject;
	}


	search(value) {
		//console.log("ApiModule_search:" + value );
		this.storage.get("data").then(data => {
			for(var p in data.categories){
				//console.log("searchIn:" + data.categories[p]);
				this.searchInCategorie(data.categories[p], value,function( categorie, response ){
					console.log("responseToSearch:" + categorie);
					console.log(response);
				}.bind(null, data.categories[p]));
			}
		})
		
	}

	searchInCategorie(categorie, value, callback){
		//console.log("ApiModule_searchInCategorie(" + value + "):" +  categorie );
		this.getData(categorie + "/", function (value, response) {
			var listObject = {};
			for(var p in response){
				if(response[p]["principaleAttributeName"] != undefined && response[p][response[p]["principaleAttributeName"]].toUpperCase().includes(value.toUpperCase())){
					//console.log("searchFound:" + response[p][response[p]["principaleAttributeName"]]);
					listObject[p] = response[p];
				}
			}
			callback(listObject);
		}.bind(null, value))
	}
}
