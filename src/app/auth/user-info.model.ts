// User info is completely independent of what you have set up for your server
export interface IUserInfo {
  sub: string;
  name: string;
  locale: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  zoneinfo: string;
  updated_at: Date;
}
