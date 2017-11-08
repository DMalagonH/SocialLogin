import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	FB_APP_ID: number = 153088531974196;

	constructor(public navCtrl: NavController, public navParams: NavParams, public fb: Facebook, public googlePlus: GooglePlus, public nativeStorage: NativeStorage, public loadingCtrl: LoadingController) {
		fb.browserInit(this.FB_APP_ID, 'v2.10');
	}

	doFbLogin = ():void => {
		let permissions = new Array<string>();
		let nav = this.navCtrl;
		let self = this;

		//the permissions your facebook app needs from the user
		permissions = ["public_profile"];

		this.fb.login(permissions)
			.then(function(response){
				let userId = response.authResponse.userID;
				let params = new Array<string>();

				self.fb.api("/me?fields=name,gender", params)
					.then(function(user){
						user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
						//now we have the users info, let's save it in the NativeStorage
						self.nativeStorage.setItem('user',
						{
							name: user.name,
							gender: user.gender,
							picture: user.picture,
							loggedBy: 'facebook'
						})
						.then(function(){
							nav.push(HomePage);

							console.log('name', user.name);
							console.log('gender', user.gender);
							console.log('picture', user.picture);
							console.log('loggedBy', user.loggedBy);

						}, function (error) {
							console.log(error);
						})
					}, function(error){
						console.log(error);
					});
			});

	};

	doGoogleLogin = ():void => {
		let nav = this.navCtrl;
		let self = this;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		loading.present();

		this.googlePlus.login({
			'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
			'webClientId': '143344999872-9enrrctu398pq7fbijhbcq2tqcpegbl7.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
			'offline': true
		}).then(function (user) {
			loading.dismiss();

			self.nativeStorage.setItem('user', {
				name: user.displayName,
				email: user.email,
				picture: user.imageUrl,
				loggedBy: 'google'
			})
			.then(function(){

				console.log('name', user.displayName);
				console.log('email', user.email);
				console.log('picture', user.imageUrl);
				console.log('loggedBy', user.loggedBy);


				nav.push(HomePage);
			}, function (error) {
				console.log(error);
			})
		}, function (error) {
			loading.dismiss();
			console.log('error', error);
		});
	};
}
