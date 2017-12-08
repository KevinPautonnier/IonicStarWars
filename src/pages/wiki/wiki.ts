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

@NgModule({
  imports:      [ ],
  declarations: [ ]
})

export class ApiModule {
	apiRequestUrl;

	constructor() {
	this.apiRequestUrl = "https://swapi.co/api/";
	};
	
	getFromApi( urlComplement ){
		console.log(this.apiRequestUrl + urlComplement);

		fetch(new Request(this.apiRequestUrl + urlComplement))
		.then(response => {
			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error('Something went wrong on api server!');
			}
		})
		.then(response => {
				console.debug(response);
				return response;
			}).catch(error => {
				console.error(error);
			});
		}
}

