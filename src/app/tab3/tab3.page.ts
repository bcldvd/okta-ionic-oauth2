import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { AuthActions, IAuthAction } from 'ionic-appauth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userInfo: IUserInfo;
  action: IAuthAction;
  authenticated: boolean;

  constructor(private authService: AuthService) {}

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
    this.getUserInfo();
  }

  signOut() {
    this.authService.signOut();
  }

  public async getUserInfo(): Promise<void> {
    this.userInfo = await this.authService.getUserInfo<IUserInfo>();
  }
}
