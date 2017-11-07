import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	user:any = {
		name: 'none',
		gender: 'none',
		picture: 'none'
	};

	userReady = false;

	constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, public fb: Facebook) {

	}

	ionViewCanEnter = ():void => {
		let self = this;
		this.nativeStorage.getItem('user')
		.then(function (data){
			self.user = {
				name: data.name,
				gender: data.gender,
				picture: data.picture
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
		this.fb.logout()
		.then(function(response) {
			//user logged out so we will remove him from the NativeStorage
			self.nativeStorage.remove('user');
			nav.push(LoginPage);
		}, function(error){
			console.log(error);
		});
	};
}
