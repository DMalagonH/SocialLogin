import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, public fb: Facebook, public nativeStorage: NativeStorage) {
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
							picture: user.picture
						})
						.then(function(){
							nav.push(HomePage);

							console.log('name', user.name);
							console.log('gender', user.gender);
							console.log('picture', user.picture);
							
						}, function (error) {
							console.log(error);
						})
					}, function(error){
						console.log(error);
					});
			});

	};

}
