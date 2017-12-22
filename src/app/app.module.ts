import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';
import { MyApp  } from './app.component';
import { WikiPage } from '../pages/wiki/wiki';
import { Modal } from '../components/modules';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { ApiModule } from '../pages/wiki/wiki';
import { SidesPage } from '../pages/sides/sides';
import { GalaxyPage } from '../pages/galaxy/galaxy';
import { SettingsPage } from '../pages/settings/settings';
import { EpisodeDetailsPage } from '../pages/episode-details/episode-details';
import { WikiElementsPage } from '../pages/wiki-elements/wiki-elements';
import { WikiDetailsPage } from '../pages/wiki-details/wiki-details';
import { WikiSearchPage } from '../pages/wiki-search/wiki-search';
import { AboutPage } from '../pages/about/about'
import { Movie8Page } from '../pages/movie8/movie8'



import { SidesPageModule } from '../pages/sides/sides.module';
import { Splash } from '../pages/splash/splash';
import { GalaxyPageModule } from '../pages/galaxy/galaxy.module';
import { IonicStorageModule } from '@ionic/storage';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { EpisodeDetailsPageModule } from '../pages/episode-details/episode-details.module';
import { WikiElementsPageModule } from '../pages/wiki-elements/wiki-elements.module';
import { WikiDetailsPageModule } from '../pages/wiki-details/wiki-details.module';
import { WikiSearchPageModule } from '../pages/wiki-search/wiki-search.module';
import { AboutPageModule } from '../pages/about/about.module'
import { Movie8PageModule } from '../pages/movie8/movie8.module'

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
    SidesPageModule,
    GalaxyPageModule,
    SettingsPageModule,
    EpisodeDetailsPageModule,
    WikiElementsPageModule,
    WikiDetailsPageModule,
    WikiSearchPageModule,
    AboutPageModule,
    Movie8PageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WikiPage,
    Splash,
    SidesPage,
    GalaxyPage,
    SettingsPage,
    EpisodeDetailsPage,
    WikiElementsPage,
    WikiDetailsPage,
    WikiSearchPage,
    AboutPage,
    Movie8Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    YoutubeVideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
