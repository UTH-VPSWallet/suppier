import { environment } from "../environments/environment";

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NOT_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERBAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    TIME_OUT: 504
};

export const API_URL = environment.API_URL;

export const API_ENDPOINTS =  {
  SUPPLIER: {
    CONTROLLER: API_URL  + "supplier/",
    LOGIN: 'login',
    CHANGE_PASS: 'change-pass',
    FORGOT_PASS: 'forgot-pass'
  },
  VPS: {
    CONTROLLER: API_URL  + "vps/",
    GET_ALL: 'supplier/get-all',
    ADD: 'supplier/add',
    EDIT: 'supplier/edit',
    REMOVE: 'supplier/remove'
  },
  ORDER: {
    CONTROLLER: API_URL  + "order/",
    GET_ALL: 'supplier/get-all',
    ADD: 'supplier/add',
  },
}