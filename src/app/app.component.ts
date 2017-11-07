import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
// import { NavController } from 'ionic-angular';


import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = HomePage;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, nativeStorage: NativeStorage) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.

			// Here we will check if the user is already logged in
      // // because we don't want to ask users to log in each time they open the app
			// let self = this;
      // nativeStorage.getItem('user')
			// 	.then(function(data){
			// 		console.log('already exists!');
			// 		splashScreen.hide();
			// 	}, function(error){
			// 		console.log("don't exists");
			// 		splashScreen.hide();
			// 	});

				// navCtrl.push(LoginPage);
				statusBar.styleDefault();
				splashScreen.hide();
		});
	}
}
