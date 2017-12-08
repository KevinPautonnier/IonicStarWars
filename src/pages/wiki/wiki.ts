import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WikiFilmsPage } from '../wiki-films/wiki-films';

@Component({
  selector: 'page-wiki',
  templateUrl: 'wiki.html'
})

export class WikiPage {

	constructor(public nav: NavController) {
		this.nav = nav
	};

	toHomePage (){
		this.nav.push(WikiFilmsPage);
	}

}

