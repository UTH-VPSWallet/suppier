import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { LoginReq, LoginRes } from "../models/auth.model";
import { lastValueFrom } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {

    async login(req: LoginReq) {
        const url = API_ENDPOINTS.SUPPLIER.CONTROLLER + API_ENDPOINTS.SUPPLIER.LOGIN;
        try {
            const resData = await lastValueFrom(this.post<LoginRes>(url, req));
            if (resData && resData.status === HttpStatusCode.Ok) {
                if(resData.result) return resData;  
            }
            return null;
        } 
        catch (err) { return err }
    }
}