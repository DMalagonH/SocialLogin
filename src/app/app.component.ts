import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = HomePage;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, nativeStorage: NativeStorage, alertCtrl: AlertController) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.

			console.log('test emulate');

			nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );

			nativeStorage.getItem('myitem')
			.then(
				data => console.log(data.property),
				error => console.error(error)
			);

			statusBar.styleDefault();
			splashScreen.hide();
		});
	}
}
