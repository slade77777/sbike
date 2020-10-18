import {AxiosError, AxiosResponse} from 'axios';

export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEDN = 403,
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
  COMMON_ERROR = 'An error occurs',
}

// This function for mapping error code from AxiosError
export function mapError(error: AxiosError) {
  const response = error.response;
  if (response) {
    return {
      data: {
        meta: {
          error_code: response.status, // This is real http code
          code: response.data?.meta?.code ?? response.status?.toString(), // This is response code returned by backend server
          message: response.data?.meta?.message ?? ErrorMessages.SERVER_ERROR,
        },
      },
    };
  }
  return error;
}

export function mapResponse(response: AxiosResponse) {
  if (response.status >= HttpCodes.BAD_REQUEST && response.data?.meta) {
    response.data.meta['error_code'] = response.status.toString();
  }
  return response;
}
