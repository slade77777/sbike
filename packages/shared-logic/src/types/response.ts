export type ServerResponse<T extends any> = Promise<{
  code: HttpCodes;
  data?: T;
  meta?: {
    code: string;
    page?: number;
    size?: number;
    total?: number;
    message?: string;
  };
}>;

export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
}

export enum ResponseCodes {
  OK = '200',
}

export enum ErrorMessages {
  FETCH_FAILURE = 'Fetch failure',
  UPDATE_FAILURE = 'Update failure',
  SERVER_ERROR = 'Server error',
  ADD_FAILURE = 'add failure',
}
