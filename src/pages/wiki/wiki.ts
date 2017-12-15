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
import {Modal} from '../../app/app.component';

@Component({
  selector: 'page-wiki',
  templateUrl: 'wiki.html'
})

export class WikiPage {
	toDisplay = undefined;
	listCategories = [
		{categorie:"films",title:"Films",imgUrl:"assets/imgs/films.jpeg"},
		{categorie:"species",title:"Species",imgUrl:"assets/imgs/species.jpg"},
		{categorie:"personnages",title:"Personnages",imgUrl:"assets/imgs/personnages.jpg"},
		{categorie:"vehicules",title:"Vehicules",imgUrl:"assets/imgs/vehicules.jpg"},
		{categorie:"starships",title:"Starships",imgUrl:"assets/imgs/starships.jpeg"},
		{categorie:"planets",title:"Planets",imgUrl:"assets/imgs/planets.jpg"},
	]
	constructor(public nav: NavController, private loadingCtrl: LoadingController, private storage: Storage) {
		this.storage.set("navigation", {categorie : "species", films : undefined, page:1, nbElemPerPage:200});
	};

	toElementListe(categorie) {
		this.nav.push(WikiElementsPage);
	}

	toWikiFilmsPage (){this.nav.push(WikiFilmsPage);};
	toWikiSpeciesPage (){
		
		this.nav.push(WikiElementsPage);
	};
	toWikiCharactersPage (){this.nav.push(WikiCharactersPage);};
	toWikiVehiculesPage (){this.nav.push(WikiVehiculesPage);};
	toWikiStarshipsPage (){
		new Modal(this.loadingCtrl).showModal(3);
		this.nav.push(WikiStarshipsPage);
	};
	toWikiPlanetsPage (){this.nav.push(WikiPlanetsPage);};

	rechercher(name) {

	}
/*
	getToDisplay(){ return this.toDisplay; }
	setToDisplay(_toDisplay){ this.toDisplay = _toDisplay }
	resetToDisplay(){this.toDisplay = undefined }
*/
}





import { NgModule }  from '@angular/core';

var tmp= {};
var wikiStorage;
var apiRequestUrl = "https://swapi.co/api/";
var data = {categories : ["films","people","vehicules","starships","species","planets"]};
// {films:{count:70, nbElemPerPage:3, data:{1:{}, ...}, ...}, ...}

function getData2step ( urlComplement, callback ){
	var url = urlComplement.split("/");
	//console.log("2ndStep:" + url[1]);
	var categorieName = url[0];
	var elementNumber = url[1];
	if(elementNumber == ""){
		updateFullCategorie(categorieName);
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
				requestApi(categorieName + "/" +  zone[0], newCallback);
			}else{
				var firstId = Number(zone[0]);
				var LastId = Number(zone[1]);
				tmp["firstId"] = Number(zone[0]);
				tmp["LastId"] = Number(zone[1]);
				tmp["nbSend"] = 0;
				tmp["categorie"] = categorieName;
				tmp["callback"] = callback;
				tmp["nbSend"] = 0;
				while(firstId <= tmp["LastId"]){
					if(data[categorieName].data[firstId] == undefined ){
						tmp["nbSend"] = tmp["nbSend"] + 1;
						requestApi(categorieName + "/" +  firstId, function(elementsId, response) {
							tmp["nbSend"] = tmp["nbSend"] -1;
							//console.log("idAjout:" + (firstId + p));
							data[tmp["categorie"]].data[elementsId] = response;

							if(tmp["nbSend"] == 0){
								// *** La dernière requête est de retour ***
								tmp["callback"](concatData(tmp["categorie"],Number(tmp["firstId"]), Number(tmp["LastId"])));
							}
						}.bind(null, firstId));
					}
					firstId = firstId + 1;
				}
				if(tmp["nbSend"] == 0){
					// *** Aucune requête n'a été effectué ***
					callback(concatData(categorieName, Number(zone[0]), LastId));
				}
			}
		}else{
			// *** Element unique ***
			if(data[categorieName].data[elementNumber] == undefined ) {
				// *** si l'élément demandé n'a pas encore été requeté. ***
				requestApi(urlComplement, response => {
					data[categorieName].data[elementNumber] = response;
					callback(response);
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
		newResponse[p+firstId] = data[categorie].data[firstId + p];
	}
	return newResponse;
}

function requestApi( urlComplement, callback ){
	//console.log("requestApi_data=" + JSON.stringify(data));
/*
	wikiStorage.get('test').then((val) => {
		console.log('test : ', val);
	});
*/
	var requestUrl = apiRequestUrl + urlComplement;
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
			callback(response);
		}).catch(error => {
			console.error(error);
	});
}

function _callbackInitCategorie( response ){
	var newCategorie = {
		count : response.count,
		nbElemPerPage : response.results.length,
		data : {}
	}
	var i = 0;
	while(response.results.length > i){
		newCategorie.data[i+1] = response.results[i];
		i= i+1;
	};
	//console.log("creation:" + tmp["urlComplement"].split("/")[0] );
	data[tmp["urlComplement"].split("/")[0]] = newCategorie;
	getData2step(tmp["urlComplement"], tmp["callback"]);
}

function updateFullCategorie(categorie) {
	console.log("fullUpdate:"+categorie);
	var i = 1;
	while(i <= data[categorie].count ){
		if(data[categorie].data[i] == undefined){
			console.log("element:" + i + "-" + data[categorie].data[i] + "xxxxxxxxxxxx");
			requestApi(categorie + "/?page=" + Math.ceil(i/data[categorie].nbElemPerPage), _callbackGetDataElement);
			i+= data[categorie].nbElemPerPage;
		}else{
			//console.log("element:" + i + "-" + data[categorie].data[i].name);
			i++
		}
	}
	//console.log("data=" + data);
}

function _callbackGetDataElement( response ) {
	var tmpData = {};
	var categorie = response.previous.split("/")[4];
	var page = Number(response.previous.split("/")[5].slice(-1)) +1;
	tmpData[categorie] = {data:{}};
	var i=0,j;
	while(i < response.results.length){
		j = (page-1)*data[categorie].nbElemPerPage + i;
		tmpData[categorie].data[j+1] = response.results[i];
		i= i+1;
	};
	console.log("ajout:" + categorie + "-p" + page);
	for(var k in tmpData[categorie].data) {
		data[categorie].data[k]=tmpData[categorie].data[k];
	}
	console.log("ajout:" + categorie + "-p" + page + "x");
	//console.log("data=" + tmpData);
}

function formatUrl(url){
	if(url.length > apiRequestUrl.length && url.subString(0,apiRequestUrl.length-1) == apiRequestUrl ){
		return url.subString(apiRequestUrl.length, url.length-1);
	}else{
		return url;
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
				wikiStorage.set("data", {categories : ["films","people","vehicules","starships","species","planets"]});
			}else {
				data = val;
			}
		})
	}

	getData( urlComplement, callback ) {
		//console.log("getData_data=" + JSON.stringify(data));

		// *** Préparation de la sauvegarde dans storage ***
		var newCallback = function(response ){ wikiStorage.set("data",data); callback(response) };
		var url = urlComplement.split("/");

		urlComplement = formatUrl(urlComplement);

		if( data[url[0]] == undefined && data.categories.indexOf(url[0]) > -1 ){
			// *** Si première demande d'une catégorie ***
			tmp["urlComplement"] = urlComplement;
			tmp["callback"] = newCallback;
			requestApi(url[0]+"/", _callbackInitCategorie );

		}else{
			// *** Si la catégorie à déjà été demandé ***
			getData2step( urlComplement, newCallback );
		}
	}
}
