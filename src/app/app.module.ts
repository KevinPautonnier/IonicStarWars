import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WikiPage, ApiModule } from '../pages/wiki/wiki';
import { SidesPage } from '../pages/sides/sides';
import { WikiFilmsPage } from '../pages/wiki-films/wiki-films';
import { WikiSpeciesPage } from '../pages/wiki-species/wiki-species';
import { WikiCharactersPage } from '../pages/wiki-characters/wiki-characters';
import { WikiVehiculesPage } from '../pages/wiki-vehicules/wiki-vehicules';
import { WikiStarshipsPage } from '../pages/wiki-starships/wiki-starships';
import { WikiPlanetsPage } from '../pages/wiki-planets/wiki-planets';
import { Splash } from '../pages/splash/splash';
import { GalaxyPage } from '../pages/galaxy/galaxy';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WikiPage,
    WikiFilmsPage,
    WikiSpeciesPage,
    WikiCharactersPage,
    WikiVehiculesPage,
    WikiStarshipsPage,
    WikiPlanetsPage,
    Splash,
    SidesPage,
    GalaxyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ApiModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WikiPage,
    WikiFilmsPage,
    WikiSpeciesPage,
    WikiCharactersPage,
    WikiVehiculesPage,
    WikiStarshipsPage,
    WikiPlanetsPage,
    Splash,
    SidesPage,
    GalaxyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
