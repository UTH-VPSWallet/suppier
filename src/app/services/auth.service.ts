import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { LoginReq, LoginRes, LoginStorage } from "../models/auth.model";
import { lastValueFrom } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";
import { LOCALSTORAGE } from "../constants/text.constant";

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {

    async login(req: LoginReq) {
        const url = API_ENDPOINTS.SUPPLIER.CONTROLLER + API_ENDPOINTS.SUPPLIER.LOGIN;
        return lastValueFrom(this.post<LoginRes>(url, req));
    }

    isLoggedIn(): boolean {
    let auth: LoginStorage = { Email: '', Name: '', Token: '' };
    try {
      const local = localStorage.getItem(LOCALSTORAGE.AUTH);
      if(local) auth = JSON.parse(local);
    } catch (e) {
      console.error('Invalid JSON in localStorage', e);
    }
    const token = auth.Token;
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = Date.now() >= payload.exp * 1000;
    return !isExpired;
  }
}