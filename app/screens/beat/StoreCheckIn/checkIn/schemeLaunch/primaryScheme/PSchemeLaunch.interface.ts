export interface IPrimarySchemeReqBody {
  channelPartnerId: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface IPrimarySchemeResponse {
  createdDate: string;
  documentId: string;
  documentName: string;
  id: number;
}

export interface ITransformedScheme {
  documentId: string;
  id: number;
  subTitle: string;
  title: string;
}
