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

	constructor(public nav: NavController) {
		this.nav = nav
	};

	toWikiFilmsPage (){this.nav.push(WikiFilmsPage);};
	toWikiSpeciesPage (){this.nav.push(WikiSpeciesPage);};
	toWikiCharactersPage (){this.nav.push(WikiCharactersPage);};
	toWikiVehiculesPage (){this.nav.push(WikiVehiculesPage);};
	toWikiStarshipsPage (){this.nav.push(WikiStarshipsPage);};
	toWikiPlanetsPage (){this.nav.push(WikiPlanetsPage);};
}

