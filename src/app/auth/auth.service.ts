import { Requestor, StorageBackend } from '@openid/appauth';
import { Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';
import { IonicAuth, Browser} from 'ionic-appauth';
import { Plugins, AppUrlOpen } from '@capacitor/core';

const { App } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth {

  constructor(requestor: Requestor,
              storage: StorageBackend,
              browser: Browser,
              private platform: Platform,
              private ngZone: NgZone) {
    super(browser, storage, requestor);

    this.addConfig();
  }

  public async startUpAsync() {
    if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
      App.addListener('appUrlOpen', (data: AppUrlOpen) => {
        this.ngZone.run(() => {
          this.handleCallback(data.url);
        });
      });
    }

    super.startUpAsync();
  }

  private onDevice(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  private async addConfig() {
    const scopes = 'openid profile offline_access';
    const redirectUri = this.onDevice() ? 'com.okta.dev-628596:/callback' : 'http://localhost:8100/implicit/callback';
    const logoutRedirectUri = this.onDevice() ? 'com.okta.dev-628596:/logout' : 'http://localhost:8100/implicit/logout';
    const clientId = '0oa4ycbmq5d6IGjRh4x6';
    const issuer = 'https://dev-628596.okta.com/oauth2/default';
    const authConfig: any = {
      identity_client: clientId,
      identity_server: issuer,
      redirect_url: redirectUri,
      end_session_redirect_url: logoutRedirectUri,
      scopes,
      usePkce: true,
    };

    this.authConfig = {...authConfig};
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0) {
      this.AuthorizationCallBack(callbackUrl).catch((error: string) => {
        console.error(`Authorization callback failed! ${error}`);
      });
    }

    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0) {
      this.EndSessionCallBack().catch((error: string) => {
        console.error(`End session callback failed! ${error}`);
      });
    }
  }
}
