
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
    GET_ALL: '/supplier/get-categories'
  },
}


