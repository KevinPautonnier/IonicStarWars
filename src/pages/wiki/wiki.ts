import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WikiFilmsPage } from '../wiki-films/wiki-films';
import { WikiSpeciesPage } from '../wiki-species/wiki-species';
import { WikiCharactersPage } from '../wiki-characters/wiki-characters';
import { WikiVehiculesPage } from '../wiki-vehicules/wiki-vehicules';
import { WikiStarshipsPage } from '../wiki-starships/wiki-starships';
import { WikiPlanetsPage } from '../wiki-planets/wiki-planets';

@Component({
  selector: 'page-wiki',
  templateUrl: 'wiki.html'
})

export class WikiPage {
	toDisplay = undefined;

	constructor(public nav: NavController) {
		this.nav = nav;
	};

	toWikiFilmsPage (){this.nav.push(WikiFilmsPage);};
	toWikiSpeciesPage (){this.nav.push(WikiSpeciesPage);};
	toWikiCharactersPage (){this.nav.push(WikiCharactersPage);};
	toWikiVehiculesPage (){this.nav.push(WikiVehiculesPage);};
	toWikiStarshipsPage (){this.nav.push(WikiStarshipsPage);};
	toWikiPlanetsPage (){this.nav.push(WikiPlanetsPage);};

	rechercher(name) {

	}

	getToDisplay(){ return this.toDisplay; }
	setToDisplay(_toDisplay){ this.toDisplay = _toDisplay }
	resetToDisplay(){this.toDisplay = undefined }

}





import { NgModule }  from '@angular/core';

var tmp;
var apiRequestUrl = "https://swapi.co/api/";
var data = {categories : ["films","people","vehicules","starships","species","planets"]};
// {films:{count:70, nbElemPerPage:3, data:{1:{}, ...}, ...}, ...}

function getData2step ( urlComplement, callback ){
	var url = urlComplement.split("/");
	console.log("2ndStep:" + url[1]);

	if(url[1] == ""){
		updateFullCategorie(url[0]);
	}else{
		// TODO : liste de page
		requestApi(urlComplement, callback);
	}
}

function requestApi( urlComplement, callback ){

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
			//console.debug(response);
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
	console.log("creation:" + tmp.urlComplement.split("/")[0] );
	data[tmp.urlComplement.split("/")[0]] = newCategorie;
	getData2step(tmp.urlComplement, tmp.callback);
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



@NgModule({
  imports:      [ ],
  declarations: [ ]
})


export class ApiModule {

	constructor() {
	};

	getData( urlComplement, callback ) {
		var url = urlComplement.split("/");
		console.log("data=" + data);
		if( data[url[0]] == undefined && data.categories.includes(url[0])){
			tmp = {};
			tmp.urlComplement = urlComplement;
			tmp.callback = callback;
			requestApi(url[0]+"/", _callbackInitCategorie );
		}else{
			console.log("categorie instancié");
			getData2step( urlComplement, callback );
		}
	}
}
