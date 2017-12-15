import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';
import { MyApp, Modal } from './app.component';
import { WikiPage } from '../pages/wiki/wiki';


import { ApiModule } from '../pages/wiki/wiki';
import { SidesPage } from '../pages/sides/sides';
import { WikiFilmsPage } from '../pages/wiki-films/wiki-films';
import { WikiSpeciesPage } from '../pages/wiki-species/wiki-species';
import { WikiCharactersPage } from '../pages/wiki-characters/wiki-characters';
import { WikiVehiculesPage } from '../pages/wiki-vehicules/wiki-vehicules';
import { WikiStarshipsPage } from '../pages/wiki-starships/wiki-starships';
import { WikiPlanetsPage } from '../pages/wiki-planets/wiki-planets';
import { GalaxyPage } from '../pages/galaxy/galaxy';
import { SettingsPage } from '../pages/settings/settings';
import { EpisodeDetailsPage } from '../pages/episode-details/episode-details';
import { WikiElementsPage } from '../pages/wiki-elements/wiki-elements';
import { WikiDetailsPage } from '../pages/wiki-details/wiki-details';
import { AboutPage } from '../pages/about/about'


import { SidesPageModule } from '../pages/sides/sides.module';
import { WikiFilmsPageModule } from '../pages/wiki-films/wiki-films.module';
import { WikiSpeciesPageModule } from '../pages/wiki-species/wiki-species.module';
import { WikiCharactersPageModule } from '../pages/wiki-characters/wiki-characters.module';
import { WikiVehiculesPageModule } from '../pages/wiki-vehicules/wiki-vehicules.module';
import { WikiStarshipsPageModule } from '../pages/wiki-starships/wiki-starships.module';
import { WikiPlanetsPageModule } from '../pages/wiki-planets/wiki-planets.module';
import { Splash } from '../pages/splash/splash';
import { GalaxyPageModule } from '../pages/galaxy/galaxy.module';
import { IonicStorageModule } from '@ionic/storage';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { EpisodeDetailsPageModule } from '../pages/episode-details/episode-details.module';
import { WikiElementsPageModule } from '../pages/wiki-elements/wiki-elements.module';
import { WikiDetailsPageModule } from '../pages/wiki-details/wiki-details.module';
import { AboutPageModule } from '../pages/about/about.module'

@NgModule({
  declarations: [
    MyApp,
    WikiPage,
    Splash
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ApiModule,
    Modal,
    WikiFilmsPageModule,
    WikiSpeciesPageModule,
    WikiCharactersPageModule,
    WikiVehiculesPageModule,
    WikiStarshipsPageModule,
    WikiPlanetsPageModule,
    SidesPageModule,
    GalaxyPageModule,
    SettingsPageModule,
    EpisodeDetailsPageModule,
    WikiElementsPageModule,
    WikiDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
