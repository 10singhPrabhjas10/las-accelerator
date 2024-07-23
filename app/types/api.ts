export interface IRefreshTokenProps {
  token: string;
}

export interface IAddSecondaryUserProps {
  data: {
    name: string;
    mobileNumber: string;
  };
}
