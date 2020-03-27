import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { AuthActions, IAuthAction } from 'ionic-appauth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  action: IAuthAction;
  authenticated: boolean;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.authObservable.subscribe(action => {
      this.action = action;
      if (
        action.action === AuthActions.SignInSuccess ||
        action.action === AuthActions.AutoSignInSuccess
      ) {
        this.authenticated = true;
      } else if (action.action === AuthActions.SignOutSuccess) {
        this.authenticated = false;
      }
    });
  }
}
