import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { ApiResponse } from "../models/api-response.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
    protected _http: HttpClient;
    public _router: Router;


    constructor(
        protected http: HttpClient,
        private router: Router,
    ) {
        this._http = http;
        this._router = router;
    }

  /**
   * GET request
   * Ex: [param1, param2, param3]
   * => apiUrl/param1/param2/param3
   */
  get<T = any>(apiUrl: string, parameter: any[] = []): Observable<ApiResponse<T>> {
    parameter.forEach(p => {
      apiUrl += ('/' + p);
    });

    return this.http.get<T>(apiUrl, {
      headers: this.getHeaders(),
      observe: 'response',
    }).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * GET request with query
   * Ex: { param1: value1, param2: value2, param3: value3 }
   * => apiUrl?param1=value1&param2=value2&param3=value3
   */
  getWithQuery<T = any>(
    apiUrl: string,
    parameter: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> },
  ): Observable<ApiResponse<T>> {
    return this.http.get<T>(apiUrl, {
      headers: this.getHeaders(),
      params: this.getParams(parameter),
      observe: 'response',
    }).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * POST request
   */
  post<TResponse = any, TBody = any>(
    apiUrl: string,
    body?: TBody,
  ): Observable<ApiResponse<TResponse>> {
    return this.http.post<TResponse>(
      apiUrl,
      body || {},
      {
        headers: this.getHeaders(),
        observe: 'response',
      },
    ).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * POST request that unwraps ApiResponse and returns result only
   */
  postResult<TResponse = any, TBody = any>(
    apiUrl: string,
    body?: TBody,
  ): Observable<TResponse> {
    return this.post<TResponse, TBody>(apiUrl, body).pipe(

      map((res) => (res?.result as TResponse)),
     catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * POST formdata request
   */
  postFormData<TResponse = any, TBody = any>(
    apiUrl: string,
    body?: TBody,
  ): Observable<ApiResponse<TResponse>> {
    return this.http.post<TResponse>(
      apiUrl,
      body,
      {
        headers: this.getHeadersFormData(),
        observe: 'response',
      },
    ).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * PUT request
   */
  put<TResponse = any, TBody = any>(apiUrl: string, body?: TBody): Observable<ApiResponse<TResponse>> {
    return this.http.put<TResponse>(
      apiUrl,
      body || {},
      {
        headers: this.getHeaders(),
        observe: 'response',
      },
    ).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * PUT formdata request
   */
  putFormData<TResponse = any, TBody = any>(
    apiUrl: string,
    body?: TBody,
  ): Observable<ApiResponse<TResponse>> {
    return this.http.put<TResponse>(
      apiUrl,
      body,
      {
        headers: this.getHeadersFormData(),
        observe: 'response',
      },
    ).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * DELETE request
   */
  delete<T = any>(apiUrl: string, data?: any | any[]): Observable<ApiResponse<T>> {
    if (data) {
      if (Array.isArray(data)) {
        data.forEach((p: string) => {
          apiUrl += ('/' + p);
        });
      } else if (typeof data === 'object') {
        return this.http.request<T>(
          'delete',
          apiUrl,
          {
            body: data || {},
            headers: this.getHeaders(),
            observe: 'response',
          },
        ).pipe(
          map(this.forwardData),
          catchError((e) => this.forwardError(e)),
        );
      } else {
        apiUrl += ('/' + data);
      }
    }
    return this.http.delete<T>(
      apiUrl,
      {
        headers: this.getHeaders(),
        observe: 'response',
      },
    ).pipe(
      map(this.forwardData),
      catchError((e) => this.forwardError(e)),
    );
  }

  /**
   * Forward data
   */
  private forwardData<T = any>(res: HttpResponse<T>): ApiResponse<T> {
    return { result: res.body, status: res.status, message: 'successful' };
  }

  /**
   * Request Error handler
   */
  private forwardError(error: HttpErrorResponse): Observable<never> {
    if (Number(error.status) === HttpStatusCode.Forbidden || Number(error.status) === 0) {
      //.router.navigate([ROUTE_PATH.PAGE_NOT_FOUND], { skipLocationChange: true });
       return throwError(() => error);
    } else {
      return throwError(() => error);
    }
  }


  /**
   * Get HttpParams from object
   */
  private getParams(obj: {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  }): HttpParams {
    return new HttpParams({ fromObject: obj });
  }

  /**
   * Common header for each API
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'content-type': 'application/json',
        // eslint-disable-next-line quote-props
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'x-requested-with': 'XMLHttpRequest',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'access-control-allow-origin': '*',
      },
    );
  }

  /**
     * Funtion get: Get data xml local by xmlpath
     * @param apiUrl
     */
  getXML(apiUrl: string = '') {
    return new Promise((resolve, reject) => {
        this.http.get(apiUrl, {
            headers: this.getHeaders(),
            observe: 'response',
            responseType: 'text'
        }).subscribe(
            (data) => {
                resolve(data);
            },
            (err) => {
                console.log(err);
                resolve(err);
            }
        );
    });
  }

  /**
   * Common header for each API
   */
  private getHeadersFormData(): HttpHeaders {
    return new HttpHeaders(
      {

        // eslint-disable-next-line @typescript-eslint/naming-convention
        'x-requested-with': 'XMLHttpRequest',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'access-control-allow-origin': '*',
      },
    );
  }
}
