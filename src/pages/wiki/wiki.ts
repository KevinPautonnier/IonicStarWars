import {Component} from '@angular/core';
import {Page,NavController} from 'ionic-angular';
import { WikiFilmsPage } from '../wiki-films/wiki-films';

@Component({
  selector: 'page-wiki',
  templateUrl: 'wiki.html'
})

export class WikiPage {

	constructor(public navCtrl: NavController) {
		this.nav = navCtrl
	};

	toHomePage (){
		this.nav.push(WikiFilmsPage);
	}

}

