import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	user:any = {
		name: 'none',
		gender: 'none',
		email: 'none',
		picture: 'none',
		loggedBy: null
	};

	userReady = false;

	constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public fb: Facebook, public googlePlus: GooglePlus) {

	}

	ionViewCanEnter = ():void => {
		let self = this;
		this.nativeStorage.getItem('user')
		.then(function (data){
			self.user = {
				name: data.name,
				gender: data.gender,
				email: data.email,
				picture: data.picture,
				loggedBy: data.loggedBy
			};
			self.userReady = true;
		}, function(error){
			console.log(error);
		});
	};

	goToLogin = ():void=>{
		this.navCtrl.push(LoginPage);
	};

	logout = ():void=>{
		var nav = this.navCtrl;
		let self = this;

		this.nativeStorage.getItem('user')
		.then(function(user){

			let logout:any;

			if(user.loggedBy == 'facebook'){
				logout = self.logoutFacebook;
			}
			else if(user.loggedBy == 'google'){
				logout = self.logoutGoogle;
			}

			logout().then(function(response){
				//user logged out so we will remove him from the NativeStorage
				self.nativeStorage.remove('user');
				nav.push(LoginPage);
			}, function(error){
				console.log(error);
			});

		}, function(error){
			console.log(error);
		});




	};

	logoutFacebook = ():Promise<any>=>{
		return this.fb.logout();
	};

	logoutGoogle = ():Promise<any>=>{
		return this.googlePlus.logout();
	};
}
