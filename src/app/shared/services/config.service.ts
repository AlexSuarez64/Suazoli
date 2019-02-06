import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

export interface Config {
  Domain: string;
  Api: string;
  Email: string;
}

@Injectable()
export class ConfigService {
  // Set defaults
  _domain = 'http://localhost:4200';
  _api = 'http://localhost:4200/api/';
  _email = 'support@xom.com';

  constructor(private http: HttpClient) {}

  get domain() {
    return this._domain;
  }

  get api() {
    return this._api;
  }

  get email() {
    return this._email;
  }

  loadConfig() {
    this.http.get<Config>('/config.json').subscribe(data => {
      this._domain = data.Domain;
      this._api = data.Api;
      this._email = data.Email;
      console.log(data);
    });
  }
}
