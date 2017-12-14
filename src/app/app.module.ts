import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';

import { MyApp, Modal } from './app.component';
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
import { IonicStorageModule } from '@ionic/storage';
import { SettingsPage } from '../pages/settings/settings';
import { EpisodeDetailsPage } from '../pages/episode-details/episode-details';
import { WikiElementsPage } from '../pages/wiki-elements/wiki-elements';
import { WikiDetailsPage } from '../pages/wiki-details/wiki-details';

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
    GalaxyPage,
    SettingsPage,
    EpisodeDetailsPage,
    WikiElementsPage,
    WikiDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ApiModule,
    Modal,
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
    GalaxyPage,
    SettingsPage,
    EpisodeDetailsPage,
    WikiElementsPage,
    WikiDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
