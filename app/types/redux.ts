export interface ISelectedLanguageState {
  id: string;
  icon: string;
  title: string;
}

export interface ISalesforceUser {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

export interface IUserReduxState {
  isAuthenticated: boolean;
  isFirstTimeAppLaunch: boolean;
  user: any; // Temp
  sfdcUser: ISalesforceUser | null;
}

export interface IModalReduxState {
  isVisible: boolean;
  header: string;
  content: string;
  buttonText?: string;
  showContactDetails?: boolean;
  isLoading?: boolean;
  tabIndex: number;
}

export interface ILocalizationState {
  translations: Array<Record<string, string>>;
  selectedLanguage: ISelectedLanguageState;
}
