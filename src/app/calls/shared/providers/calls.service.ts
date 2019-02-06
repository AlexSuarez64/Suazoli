import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { Call } from '../models/call';

@Injectable()
export class CallsService {

  private baseUrl = 'api/calls';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private hc: HttpClient) {}

  getCalls(): Observable<Call[]> {
    return this.hc.get<Call[]>(`${this.baseUrl}`)
                  .pipe(
                    catchError(this.handleError)
                  );
  }

  getCall(call: Call): Observable<Call> {
    const id = call.id;
    if (id === 0) {
      return Observable.create({
        id: 0,
        name: null,
        description: null,
        startDate: null,
        completionDate: null
      });
    }
    return this.hc.get<Call>(`${this.baseUrl}/${id}`, { responseType: 'json' })
                  .pipe(
                    catchError(this.handleError)
                  );
  }

  createCall(call: Call): Observable<Object> {
    return this.hc.post(`${this.baseUrl}`, call, this.httpOptions)
                  .pipe(
                    catchError(this.handleError)
                  );
  }

  deleteCall(call: Call): Observable<Object> {
    return this.hc.delete(`${this.baseUrl}/${call.id}`)
                  .pipe(
                    catchError(this.handleError)
                  );
  }

  updateCall(call: Call): Observable<Object> {
    return this.hc.put(`${this.baseUrl}/${call.id}`, call, this.httpOptions)
                  .pipe(
                    catchError(this.handleError)
                  );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

