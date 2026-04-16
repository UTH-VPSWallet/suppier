import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import { ApiService } from "./api.service";
import { Res, ResData } from "../models/res.model";
import { ChangePassReq, ForgotPassReq, ForgotPassRes } from "../models/supplier.model";

@Injectable({ providedIn: 'root' })
export class SupplierService extends ApiService {

    async ChangePass(req: ChangePassReq): Promise<Res> {
        const url = API_ENDPOINTS.SUPPLIER.CONTROLLER + API_ENDPOINTS.SUPPLIER.CHANGE_PASS;
        return await lastValueFrom(this.post<Res>(url, req));
    }
    async ForgotPass(req: ForgotPassReq): Promise<ResData<ForgotPassRes>> {
        const url = API_ENDPOINTS.SUPPLIER.CONTROLLER + API_ENDPOINTS.SUPPLIER.FORGOT_PASS;
        return await lastValueFrom(this.post<ResData<ForgotPassRes>>(url, req));
    }
}
