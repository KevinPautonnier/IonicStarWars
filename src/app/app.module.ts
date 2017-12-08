import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WikiPage, ApiModule } from '../pages/wiki/wiki';
import { WikiFilmsPage } from '../pages/wiki-films/wiki-films';
import { WikiSpeciesPage } from '../pages/wiki-species/wiki-species';
import { WikiCharactersPage } from '../pages/wiki-characters/wiki-characters';
import { WikiVehiculesPage } from '../pages/wiki-vehicules/wiki-vehicules';
import { WikiStarshipsPage } from '../pages/wiki-starships/wiki-starships';
import { WikiPlanetsPage } from '../pages/wiki-planets/wiki-planets';
import { Splash } from '../pages/splash/splash';

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
    Splash
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
    Splash
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
